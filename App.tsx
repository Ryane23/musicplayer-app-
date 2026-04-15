/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


const DUMMY_TRACKS = [
  { id: '1', title: 'Song One', artist: 'Artist A', albumArt: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Song Two', artist: 'Artist B', albumArt: 'https://via.placeholder.com/150' },
  { id: '3', title: 'Song Three', artist: 'Artist C', albumArt: 'https://via.placeholder.com/150' },
];

export default function App() {
  const [currentTrack, setCurrentTrack] = React.useState(DUMMY_TRACKS[0]);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlayPause = () => setIsPlaying((prev) => !prev);
  const handleNext = () => {
    const idx = DUMMY_TRACKS.findIndex(t => t.id === currentTrack.id);
    setCurrentTrack(DUMMY_TRACKS[(idx + 1) % DUMMY_TRACKS.length]);
    setIsPlaying(true);
  };
  const handlePrev = () => {
    const idx = DUMMY_TRACKS.findIndex(t => t.id === currentTrack.id);
    setCurrentTrack(DUMMY_TRACKS[(idx - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length]);
    setIsPlaying(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.albumArtContainer}>
        <Image source={{ uri: currentTrack.albumArt }} style={styles.albumArt} />
      </View>
      <Text style={styles.title}>{currentTrack.title}</Text>
      <Text style={styles.artist}>{currentTrack.artist}</Text>
      <View style={styles.controls}>
        <TouchableOpacity onPress={handlePrev}>
          <Icon name="skip-previous" size={40} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePlayPause}>
          <Icon name={isPlaying ? 'pause-circle-filled' : 'play-circle-filled'} size={60} color="#1DB954" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <Icon name="skip-next" size={40} color="#333" />
        </TouchableOpacity>
      </View>
      <View style={styles.playlistContainer}>
        <Text style={styles.playlistTitle}>Playlist</Text>
        <FlatList
          data={DUMMY_TRACKS}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setCurrentTrack(item)} style={styles.playlistItem}>
              <Image source={{ uri: item.albumArt }} style={styles.playlistArt} />
              <View>
                <Text style={styles.playlistSong}>{item.title}</Text>
                <Text style={styles.playlistArtist}>{item.artist}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  albumArtContainer: {
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  albumArt: {
    width: 200,
    height: 200,
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#222',
  },
  artist: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    gap: 30,
  },
  playlistContainer: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  playlistTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
  },
  playlistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  playlistArt: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  playlistSong: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  playlistArtist: {
    fontSize: 14,
    color: '#888',
  },
});
