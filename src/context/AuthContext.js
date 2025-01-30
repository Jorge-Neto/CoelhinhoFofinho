import React, { createContext, useContext, useEffect, useState, useCallback } from "react"
import { auth } from '../utils/firebaseConfig';
import { getFirestore, doc, getDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore"
import { signOut, deleteUser, EmailAuthProvider, reauthenticateWithCredential, onAuthStateChanged } from "firebase/auth"
import PasswordPrompt from "../components/PasswordPrompt";
import { Alert } from "react-native";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dailyUsage, setDailyUsage] = useState(0)
  const [limitReached, setLimitReached] = useState(false)
  const [userData, setUserData] = useState(null);
  const [passwordPromptVisible, setPasswordPromptVisible] = useState(false);
  const [passwordForReauth, setPasswordForReauth] = useState(null);
  const [deleteJustification, setDeleteJustification] = useState('');

  const db = getFirestore()

  const initializeSession = useCallback(async () => {
    const user = auth.currentUser

    if (!user) {
      // console.error("Nenhum usuário autenticado.")
      return
    }

    try {
      const now = new Date()
      const today = now.toISOString().split("T")[0]
      const userRef = doc(db, "users", user.uid)

      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        const { dailyUsage, lastAccessDate } = userDoc.data()

        if (lastAccessDate !== today) {
          await setDoc(userRef, { dailyUsage: 0, lastAccessDate: today }, { merge: true })
          setDailyUsage(0)
        } else {
          setDailyUsage(dailyUsage)
        }

        setLimitReached(dailyUsage >= 3600)
      } else {
        await setDoc(userRef, {
          dailyUsage: 0,
          lastAccessDate: today,
        })
        setDailyUsage(0)
      }
    } catch (error) {
      // console.error("Erro ao inicializar sessão:", error.message)
    }
  }, [auth, db])

  useEffect(() => {
    initializeSession()
  }, [initializeSession])

  useEffect(() => {
    const updateUsageInterval = setInterval(async () => {
      const user = auth.currentUser
      if (!user) return

      if (limitReached) {
        handleLogout()
        return
      }

      try {
        const elapsedSeconds = 60
        const userRef = doc(db, "users", user.uid)
        const userDoc = await getDoc(userRef)

        if (userDoc.exists()) {
          const { dailyUsage } = userDoc.data()

          if (dailyUsage + elapsedSeconds >= 3600) {
            setLimitReached(true)
            Alert.alert("Limite Atingido", "Você atingiu o limite de 1 hora de uso diário. Volte amanhã!")
            handleLogout()
            return
          }

          await updateDoc(userRef, {
            dailyUsage: dailyUsage + elapsedSeconds,
          })

          setDailyUsage(dailyUsage + elapsedSeconds)
        }
      } catch (error) {
        // console.error("Erro ao atualizar uso diário:", error.message)
      }
    }, 60000)

    return () => clearInterval(updateUsageInterval)
  }, [limitReached, auth, db])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const checkAccess = useCallback(() => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Acesso Negado", "Você precisa estar logado para acessar este recurso.");
      return false;
    }

    if (limitReached) {
      Alert.alert("Limite Atingido", "Você atingiu o limite de uso gratuito diário. Volte amanhã!");
      handleLogout();
      return false;
    }

    return true;
  }, [auth, limitReached, handleLogout]);

  const handleLogout = useCallback(async () => {
    setLoading(true);

    try {
      await signOut(auth)
    } catch (error) {
      // console.error("Erro ao fazer logout:", error.message)
      Alert.alert("Erro", "Não foi possível fazer logout. Por favor, tente novamente.")
    } finally {
      setLoading(false);
    }
  }, [auth])

  const fetchUserData = useCallback(async () => {
    const user = auth.currentUser;

    if (!user) {
      // console.error("Nenhum usuário autenticado.");
      setUserData(null);
      return null;
    }

    setLoading(true);

    try {
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserData(data);
        return data;
      } else {
        // console.error("Dados do usuário não encontrados.");
        setUserData(null);
        return null;
      }
    } catch (error) {
      // console.error("Erro ao buscar dados do usuário:", error.message);
      setUserData(null);
      return null;
    } finally {
      setLoading(false)
    }
  }, [auth, db]);

  const updateUserData = useCallback(async (newData) => {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("Usuário não autenticado.");
    }

    setLoading(true);

    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, newData);

      setUserData((prevData) => ({
        ...prevData,
        ...newData,
      }));
    } catch (error) {
      // console.error("Erro ao atualizar os dados do usuário:", error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [auth, db]);

  const handleDeleteAccount = useCallback(async (password) => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Erro", "Nenhum usuário autenticado.");
      return;
    }

    setLoading(true);

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);

      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        isActive: false,
        deleteJustification,
        deletedAt: new Date().toISOString(),
      });

      await deleteUser(user);

      await handleLogout();
      Alert.alert("Conta Excluída", "Sua conta foi excluída com sucesso.");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        Alert.alert("Erro", "Senha incorreta. Tente novamente.");
      } else if (error.code === "auth/requires-recent-login") {
        Alert.alert("Erro", "Reautenticação necessária. Tente novamente.");
      } else {
        console.log("Erro: ", error)
        Alert.alert("Erro", "Não foi possível excluir a conta. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }, [auth, db]);

  const handlePasswordConfirm = (password) => {
    setPasswordPromptVisible(false);
    handleDeleteAccount(password);
  };

  const showPasswordPrompt = () => setPasswordPromptVisible(true);

  const handlePasswordCancel = () => setPasswordPromptVisible(false);

  return (
    <AuthContext.Provider value={{ user, loading, dailyUsage, limitReached, userData, fetchUserData, updateUserData, checkAccess, handleLogout, handleDeleteAccount, showPasswordPrompt, setDeleteJustification, currentUser: auth.currentUser }}>
      {children}
      <PasswordPrompt
        visible={passwordPromptVisible}
        onConfirm={handlePasswordConfirm}
        onCancel={handlePasswordCancel}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
