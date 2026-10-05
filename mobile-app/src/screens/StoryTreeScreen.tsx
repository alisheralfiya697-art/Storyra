import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Colors } from '../constants/theme';

export const StoryTreeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#7D2948" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Interactive Multiverse Tree</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.treeTitle}>The Last Door: Decision Map</Text>
        <Text style={styles.treeSub}>
          Visualizing branching storylines, community canon choices, and alternative endings.
        </Text>

        {/* Node 1: Root */}
        <View style={styles.treeNodeActive}>
          <Text style={styles.nodeTag}>ROOT CHAPTER (CANON)</Text>
          <Text style={styles.nodeTitle}>Part 1: The Wax Seal</Text>
          <Text style={styles.nodeDesc}>
            Aria discovers the shifting corridor at midnight and hears the whisper through the keyhole.
          </Text>
        </View>

        <View style={styles.connector} />

        {/* Decision Split */}
        <View style={styles.splitBox}>
          <Text style={styles.splitTitle}>Community Vote Split</Text>

          <View style={styles.branchBox}>
            <View style={styles.branchPillWinning}>
              <Text style={styles.branchPillText}>WINNING PATH (56% VOTES)</Text>
            </View>
            <Text style={styles.branchName}>Branch A: Turned Key Immediately</Text>
            <Text style={styles.branchStatus}>✓ Canonized in Official Storyline</Text>
          </View>

          <View style={styles.branchBoxAlt}>
            <View style={styles.branchPillAlt}>
              <Text style={styles.branchPillTextAlt}>SPIN-OFF PATH (30% VOTES)</Text>
            </View>
            <Text style={styles.branchName}>Branch B: Demanded Identity</Text>
            <Text style={styles.branchStatusAlt}>⚡ Canon Contender (840 / 1000 votes)</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF8F5',
  },
  header: {
    backgroundColor: '#7D2948',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  treeTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E1B18',
  },
  treeSub: {
    fontSize: 13,
    color: '#8E7F73',
    marginTop: 4,
    marginBottom: 20,
  },
  treeNodeActive: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  nodeTag: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '800',
  },
  nodeTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E1B18',
    marginTop: 4,
  },
  nodeDesc: {
    fontSize: 12,
    color: '#52453D',
    marginTop: 6,
    lineHeight: 18,
  },
  connector: {
    width: 2,
    height: 24,
    backgroundColor: Colors.primary,
    alignSelf: 'center',
    marginVertical: 4,
  },
  splitBox: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECE6DE',
    gap: 12,
  },
  splitTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1E1B18',
  },
  branchBox: {
    backgroundColor: 'rgba(16,185,129,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(16,185,129,0.3)',
    borderRadius: 14,
    padding: 12,
  },
  branchPillWinning: {
    alignSelf: 'flex-start',
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
  },
  branchPillText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '800',
  },
  branchName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1B18',
  },
  branchStatus: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '600',
    marginTop: 2,
  },
  branchBoxAlt: {
    backgroundColor: 'rgba(125,41,72,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(125,41,72,0.2)',
    borderRadius: 14,
    padding: 12,
  },
  branchPillAlt: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
  },
  branchPillTextAlt: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '800',
  },
  branchStatusAlt: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
});
