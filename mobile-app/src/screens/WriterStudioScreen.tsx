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

export const WriterStudioScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#7D2948" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Writer Studio & Analytics</Text>
        <TouchableOpacity style={styles.newChapBtn}>
          <Text style={styles.newChapText}>+ New Chapter</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* KPI Grid */}
        <Text style={styles.sectionTitle}>StoryPulse Performance</Text>
        <View style={styles.kpiGrid}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiVal}>24,890</Text>
            <Text style={styles.kpiLbl}>Active Readers</Text>
            <Text style={styles.kpiGrowth}>+18% this month</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiVal}>14,120</Text>
            <Text style={styles.kpiLbl}>Audio Listeners</Text>
            <Text style={styles.kpiGrowth}>37% of audience</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiVal}>3,840</Text>
            <Text style={styles.kpiLbl}>Decision Votes</Text>
            <Text style={styles.kpiGrowth}>94% engagement</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiVal}>88.4%</Text>
            <Text style={styles.kpiLbl}>Completion Rate</Text>
            <Text style={styles.kpiGrowth}>Top 5% on platform</Text>
          </View>
        </View>

        {/* Multilingual Pipeline Box */}
        <View style={styles.transBox}>
          <Text style={styles.transTitle}>English ↔ हिन्दी Translation & Audio</Text>
          <Text style={styles.transDesc}>
            Preserves original English chapter while storing literary Hindi translations separately.
          </Text>

          <View style={styles.transRow}>
            <View style={styles.langPill}>
              <Text style={styles.langPillText}>✓ English Original</Text>
            </View>
            <View style={styles.langPill}>
              <Text style={styles.langPillText}>✓ हिन्दी Translation</Text>
            </View>
            <View style={styles.langPill}>
              <Text style={styles.langPillText}>✓ Hindi Audio</Text>
            </View>
          </View>
        </View>

        {/* Published Chapters */}
        <Text style={styles.sectionTitle}>Manage Story Chapters</Text>
        <TouchableOpacity
          style={styles.chapRow}
          onPress={() => navigation.navigate('Reader', { chapterId: 'chap-1-1' })}
        >
          <View>
            <Text style={styles.chapTitle}>Part 1: The Wax Seal</Text>
            <Text style={styles.chapMeta}>Published · 1,420 words · Active Decision</Text>
          </View>
          <Text style={styles.editBtn}>Edit ›</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '800',
  },
  newChapBtn: {
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  newChapText: {
    color: '#7D2948',
    fontSize: 12,
    fontWeight: '800',
  },
  content: {
    padding: 16,
    paddingBottom: 80,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E1B18',
    marginBottom: 12,
    marginTop: 8,
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  kpiCard: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECE6DE',
  },
  kpiVal: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E1B18',
  },
  kpiLbl: {
    fontSize: 11,
    color: '#8E7F73',
    marginTop: 2,
  },
  kpiGrowth: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10B981',
    marginTop: 4,
  },
  transBox: {
    backgroundColor: 'rgba(125,41,72,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(125,41,72,0.25)',
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
  },
  transTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#7D2948',
    marginBottom: 4,
  },
  transDesc: {
    fontSize: 12,
    color: '#52453D',
    lineHeight: 16,
    marginBottom: 10,
  },
  transRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  langPill: {
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ECE6DE',
  },
  langPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7D2948',
  },
  chapRow: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ECE6DE',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chapTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E1B18',
  },
  chapMeta: {
    fontSize: 11,
    color: '#8E7F73',
    marginTop: 3,
  },
  editBtn: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.primary,
  },
});
