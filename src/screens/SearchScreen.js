import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, Image, ActivityIndicator, Keyboard } from 'react-native';
import LayoutWithFooter from '../layouts/LayoutWithFooter';
import YoutubePlayer from "react-native-youtube-iframe";
import { API_KEY, YOUTUBE_API_URL } from "@env";
import { useAgeGroup } from '../context/AgeGroupContext';
import { TouchableWithSound } from '../components/CustomButton';

const SearchScreen = ({ navigation }) => {
  const { selectedAgeGroup } = useAgeGroup();
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [lastQuery, setLastQuery] = useState('');

  const fetchVideos = async (searchQuery, pageToken = '') => {
    if (!searchQuery.trim()) return;

    const query = `${searchQuery} ${selectedAgeGroup}`;

    if (pageToken === '') {
      setVideos([]);
      setLastQuery(query);
    }

    const url = `${YOUTUBE_API_URL}?part=snippet&q=${encodeURIComponent(query)}&type=video&key=${API_KEY}&maxResults=10&safeSearch=strict&pageToken=${pageToken}`;

    try {
      if (pageToken) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const response = await fetch(url);
      const data = await response.json();

      setVideos((prevVideos) => {
        const newVideos = data.items || [];
        return pageToken ? [...prevVideos, ...newVideos] : newVideos;
      });

      setNextPageToken(data.nextPageToken || null);
    } catch (error) {
      console.error("Erro ao buscar vídeos:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleSearch = () => {
    if (query !== lastQuery) {
      fetchVideos(query);
      Keyboard.dismiss();
    }
  };

  const loadMoreVideos = () => {
    if (nextPageToken) {
      fetchVideos(query, nextPageToken);
    }
  };

  const handleVideoPress = (videoId) => {
    setSelectedVideoId(videoId);
  };

  return (
    <LayoutWithFooter activeTab={'Search'}>
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
        <View style={styles.container}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar no YouTube..."
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={handleSearch}
            onBlur={handleSearch}
          />
          <TouchableWithSound onPress={handleSearch} style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Buscar</Text>
          </TouchableWithSound>

          {loading ? (
            <ActivityIndicator size="large" color="#77C6C4" />
          ) : (
            <ScrollView style={styles.scrollContainer}>
              {videos.map((video) => (
                <TouchableWithSound
                  key={video.id.videoId}
                  style={styles.item}
                  onPress={() => handleVideoPress(video.id.videoId)}
                >
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: video.snippet.thumbnails.medium.url }}
                      style={styles.itemImage}
                    />
                  </View>
                  <Text style={styles.itemText}>{video.snippet.title}</Text>
                </TouchableWithSound>
              ))}
              {nextPageToken && (
                <TouchableWithSound onPress={loadMoreVideos} style={styles.loadMoreButton}>
                  {loadingMore ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.loadMoreText}>Ver mais</Text>
                  )}
                </TouchableWithSound>
              )}
            </ScrollView>
          )}

        </View>
      )}
    </LayoutWithFooter>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    backgroundColor: '#FFF',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchButton: {
    backgroundColor: '#77C6C4',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  loadMoreButton: {
    backgroundColor: '#77C6C4',
    borderRadius: 8,
    padding: 10,
    marginVertical: 20,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  item: {
    marginBottom: 15,
    backgroundColor: '#434343',
    borderRadius: 8,
    padding: 10,
  },
  imageContainer: {
    width: '100%',
    height: 100,
  },
  itemImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  itemText: {
    color: '#FDFDFD',
    marginTop: 8,
    fontSize: 14,
    fontWeight: 'semibold',
    textAlign: 'center',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeButton: {
    backgroundColor: '#77C6C4',
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  loadMoreText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SearchScreen;
