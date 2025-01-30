import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, ActivityIndicator } from 'react-native';
import LayoutWithFooter from '../layouts/LayoutWithFooter';
import YoutubePlayer from "react-native-youtube-iframe";
import { useAgeGroup } from '../context/AgeGroupContext';
const screenWidth = Dimensions.get('window').width;

import {
  API_KEY,
  YOUTUBE_API_URL
} from "@env";
import { useAuth } from '../context/AuthContext';
import { TouchableWithSound } from '../components/CustomButton';

const categories = {
  music: 'desenhos de música',
  animals: 'desenhos de animais',
  adventures: 'desenhos de aventuras',
};

const DrawingScreen = ({ navigation }) => {
  const { selectedAgeGroup } = useAgeGroup();
  const [videos, setVideos] = useState({});
  const [loading, setLoading] = useState({});
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nextPageTokens, setNextPageTokens] = useState({});
  const { checkAccess, fetchUserData } = useAuth();

  const fetchVideos = async (categoryKey, categoryName, pageToken = '') => {
    setLoading((prev) => ({ ...prev, [categoryKey]: true }));

    try {
      const url = `${YOUTUBE_API_URL}?part=snippet&q=${encodeURIComponent(categoryName)}&type=video&key=${API_KEY}&maxResults=10&safeSearch=strict&pageToken=${pageToken}`;
      const response = await fetch(url);
      const data = await response.json();

      const newVideos = data.items || [];
      setVideos((prev) => ({
        ...prev,
        [categoryKey]: pageToken ? [...(prev[categoryKey] || []), ...newVideos] : newVideos,
      }));
      setNextPageTokens((prev) => ({
        ...prev,
        [categoryKey]: data.nextPageToken || null,
      }));
    } catch (error) {
      console.error(`Erro ao buscar vídeos para a categoria ${categoryName}:`, error);
    } finally {
      setLoading((prev) => ({ ...prev, [categoryKey]: false }));
    }
  };

  useEffect(() => {
    const loadAllVideos = async () => {
      await Promise.all(
        Object.entries(categories).map(async ([key, name]) => {
          const ageSpecificQuery = `${name} ${selectedAgeGroup}`;
          await fetchVideos(key, ageSpecificQuery);
        })
      );
      setIsLoading(false);
    };

    loadAllVideos();
  }, [selectedAgeGroup]);

  const handleLoadMore = (categoryKey) => {
    const pageToken = nextPageTokens[categoryKey];
    if (pageToken) {
      const categoryName = `${categories[categoryKey]} ${selectedAgeGroup}`;
      fetchVideos(categoryKey, categoryName, pageToken);
    }
  };

  const handleVideoPress = (videoId) => {
    if (checkAccess()) {
      setSelectedVideoId(videoId);
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Splash' }],
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [navigation]);

  return (
    <LayoutWithFooter activeTab={'Drawing'}>
      {selectedVideoId ? (
        <View>
          <YoutubePlayer
            height={300}
            play={true}
            videoId={selectedVideoId}
            onChangeState={(state) => {
              if (state === 'ended') {
                setSelectedVideoId(null);
              }
            }}
          />
          <View style={styles.closeButtonContainer}>
            <TouchableWithSound
              style={styles.closeButton}
              onPress={() => setSelectedVideoId(null)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableWithSound>
          </View>
        </View>
      ) : (
        <ScrollView style={styles.container}>
          {Object.entries(categories).map(([key, name]) => (
            <View key={key} style={styles.carouselContainer}>
              <Text style={styles.carouselTitle}>{name}</Text>
              {loading[key] ? (
                <ActivityIndicator size="large" color="#77C6C4" />
              ) : (
                <ScrollView horizontal style={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
                  {videos[key]?.map((video) => (
                    <TouchableWithSound key={video.id.videoId} style={styles.item} onPress={() => handleVideoPress(video.id.videoId)}>
                      <View style={styles.imageContainer}>
                        <Image source={{ uri: video.snippet.thumbnails.medium.url }} style={styles.itemImage} />
                        <View style={styles.timeContainer}>
                        </View>
                      </View>
                      <Text style={styles.itemText}>{video.snippet.title}</Text>
                    </TouchableWithSound>
                  ))}
                  <TouchableWithSound onPress={() => handleLoadMore(key)} style={styles.loadMoreButton} disabled={isLoading}>
                    <Text style={styles.loadMoreText}>Ver mais</Text>
                  </TouchableWithSound>
                </ScrollView>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </LayoutWithFooter>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    color: '#000000',
  },
  carouselContainer: {
    marginBottom: 18,
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 7,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  scrollContainer: {
    backgroundColor: '#77C6C4',
    paddingTop: 18,
    paddingBottom: 19,
    paddingHorizontal: 12,
  },
  item: {
    width: screenWidth * 0.6,
    backgroundColor: '#434343',
    marginRight: 17.5,
    borderRadius: 6,
    elevation: 4,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,

  },
  timeContainer: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#505050',
    borderRadius: 3,
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
  timeText: {
    fontSize: 10,
    color: '#FFF',
    fontWeight: 'bold',
  },
  itemText: {
    paddingVertical: 10,
    paddingHorizontal: 4,
    fontSize: 11,
    fontWeight: 'semibold',
    color: '#FDFDFD',
    textAlign: 'center'
  },
  closeButtonContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: '#889DD1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loadMoreButton: {
    width: screenWidth * 0.6,
    backgroundColor: '#77C6C4',
    marginRight: 17.5,
    borderRadius: 6,
    elevation: 4,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    width: 134,
  },
  loadMoreText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DrawingScreen;
