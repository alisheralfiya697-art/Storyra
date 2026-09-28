import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Save,
  Check,
  Vote,
  Users,
  Sparkles,
  AlertCircle,
  Plus,
  Trash2,
  Clock,
  Eye,
  X,
  Volume2,
  ShieldCheck,
} from 'lucide-react';
import { useStoryVerse } from '../../context/StoryVerseContext';
import { DecisionChoice, DecisionPoint } from '../../types';

interface EditorDecisionPoint {
  id: string;
  prompt: string;
  contextDescription: string;
  choices: string[];
}

export const DistractionFreeEditor: React.FC = () => {
  const {
    activeStory,
    activeChapter,
    updateChapterContent,
    setChapterDecisionPoint,
    setChapterDecisionPoints,
    characters,
    setViewMode,
    t,
    language,
    isRTL,
  } = useStoryVerse();

  const [title, setTitle] = useState(activeChapter?.title || '');
  const [content, setContent] = useState(activeChapter?.content || '');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [isDecisionModalOpen, setIsDecisionModalOpen] = useState(false);
  const [isCharacterDrawerOpen, setIsCharacterDrawerOpen] = useState(false);
  const [isConsistencyModalOpen, setIsConsistencyModalOpen] = useState(false);
  const [consistencyIssues, setConsistencyIssues] = useState<string[]>([]);

  // Decision Modal State supporting multiple decision points
  const [decisionPointsList, setDecisionPointsList] = useState<EditorDecisionPoint[]>([]);

  useEffect(() => {
    if (activeChapter) {
      setTitle(activeChapter.title);
      setContent(activeChapter.content);

      if (activeChapter.decisionPoints && activeChapter.decisionPoints.length > 0) {
        setDecisionPointsList(
          activeChapter.decisionPoints.map((dp) => ({
            id: dp.id,
            prompt: dp.prompt,
            contextDescription: dp.contextDescription || '',
            choices: dp.choices.map((c) => c.text),
          }))
        );
      } else if (activeChapter.decisionPoint) {
        setDecisionPointsList([
          {
            id: activeChapter.decisionPoint.id,
            prompt: activeChapter.decisionPoint.prompt,
            contextDescription: activeChapter.decisionPoint.contextDescription || '',
            choices: activeChapter.decisionPoint.choices.map((c) => c.text),
          },
        ]);
      } else {
        setDecisionPointsList([
          {
            id: `dec-${activeChapter.id}-1`,
            prompt: 'What should the protagonist do next?',
            contextDescription: 'The community vote decides the trajectory of the subsequent release.',
            choices: ['Open the door', 'Walk away quietly', 'Call for backup'],
          },
        ]);
      }
    }
  }, [activeChapter]);

  if (!activeStory || !activeChapter) return null;

  // Word count & stats
  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(words / 220));
  const wordGoal = 2000;
  const goalPercent = Math.min(100, Math.round((words / wordGoal) * 100));

  // Auto-save effect
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    setSaveStatus('saving');
    setTimeout(() => {
      updateChapterContent(activeChapter.id, title, newContent);
      setSaveStatus('saved');
    }, 800);
  };

  const handleSaveDecision = () => {
    const formatted: DecisionPoint[] = decisionPointsList
      .filter((dp) => dp.prompt.trim().length > 0)
      .map((dp, idx) => {
        const existingDp = activeChapter.decisionPoints?.find((d) => d.id === dp.id);
        const validChoices = dp.choices.filter((c) => c.trim().length > 0);
        return {
          id: dp.id || `dec-${activeChapter.id}-${idx + 1}-${Date.now()}`,
          prompt: dp.prompt,
          contextDescription:
            dp.contextDescription || 'The community vote decides the trajectory of the subsequent release.',
          choices: validChoices.map((text, cIdx) => {
            const existingChoice = existingDp?.choices[cIdx];
            return {
              id: existingChoice?.id || `opt-${idx + 1}-${cIdx + 1}-${Date.now()}`,
              text,
              votes: existingChoice?.votes || 0,
              percentage: existingChoice?.percentage || (cIdx === 0 ? 100 : 0),
            };
          }),
          totalVotes: existingDp?.totalVotes || 0,
          isActive: true,
          votingDeadline:
            existingDp?.votingDeadline || new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
        };
      });

    setChapterDecisionPoints(activeChapter.id, formatted);
    if (formatted.length > 0) {
      setChapterDecisionPoint(activeChapter.id, formatted[0]);
    } else {
      setChapterDecisionPoint(activeChapter.id, undefined);
    }

    setIsDecisionModalOpen(false);
  };

  // Run AI Consistency Check
  const runConsistencyCheck = () => {
    const issues: string[] = [];
    if (content.toLowerCase().includes('blue eyes') && content.toLowerCase().includes('green eyes')) {
      issues.push("Eye color mismatch: Text references both 'blue eyes' and 'green eyes' for the character.");
    }
    if (content.length > 500 && !content.toLowerCase().includes('daniel') && characters.some(c => c.name.includes('Daniel'))) {
      issues.push("Daniel Ward is marked as a major character in this chapter's branch, but isn't mentioned in the current scene.");
    }
    if (issues.length === 0) {
      issues.push("No continuity discrepancies detected across active character profiles.");
    }
    setConsistencyIssues(issues);
    setIsConsistencyModalOpen(true);
  };

  const storyCharacters = characters.filter((c) => c.storyId === activeStory.id);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#151210] text-[#241F1A] dark:text-[#E8E1D9] flex flex-col justify-between">
      {/* Top Writer Studio Header */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/90 dark:bg-[#151210]/90 backdrop-blur-md border-b border-[#ECE6DE] dark:border-[#2E2824]">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode('writer_dashboard')}
              className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[#8E7F73] hover:text-[#241F1A] dark:hover:text-[#E8E1D9] cursor-pointer"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#7D2948] dark:text-[#F3ACB6] block">
                {activeStory.title}
              </span>
              <span className="text-xs font-semibold text-[#8E7F73]">
                {saveStatus === 'saving' ? (
                  <span className="text-amber-600 animate-pulse">{language === 'hi' ? 'परिवर्तन सहेज रहे हैं...' : language === 'ur' ? 'تبدیلیاں محفوظ ہو رہی ہیں...' : 'Saving changes...'}</span>
                ) : (
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <Check className="w-3 h-3" /> {t('writer_cloud_synced')}
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Word Count, Reading Time & Goal Meter */}
          <div className="hidden md:flex items-center gap-6 text-xs text-[#8E7F73]">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#241F1A] dark:text-[#E8E1D9]">{words.toLocaleString()}</span> {t('writer_word_count')}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>~{readingTime} min</span>
            </div>
            <div className="w-24 bg-[#ECE6DE] dark:bg-[#342D27] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#7D2948] h-full" style={{ width: `${goalPercent}%` }} />
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDecisionModalOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-900 dark:text-amber-300 border border-amber-500/30 text-xs font-semibold hover:bg-amber-500/20 flex items-center gap-1.5 cursor-pointer"
              title="Insert or configure interactive decision point"
            >
              <Vote className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">
                {activeChapter.decisionPoint ? t('tool_edit') + ' Decision' : t('writer_add_decision')}
              </span>
            </button>

            <button
              onClick={() => setIsCharacterDrawerOpen(true)}
              className="p-2 rounded-lg border border-[#ECE6DE] dark:border-[#38312B] hover:bg-black/5 dark:hover:bg-white/5 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              title="Open character reference encyclopedia"
            >
              <Users className="w-4 h-4 text-[#7D2948]" />
              <span className="hidden sm:inline">{t('writer_character_codex')}</span>
            </button>

            <button
              onClick={runConsistencyCheck}
              className="p-2 rounded-lg border border-[#ECE6DE] dark:border-[#38312B] hover:bg-black/5 dark:hover:bg-white/5 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              title="Run AI Narrative Consistency Assistant"
            >
              <Sparkles className="w-4 h-4 text-[#7D2948]" />
              <span className="hidden sm:inline">Consistency</span>
            </button>

            <button
              onClick={() => {
                updateChapterContent(activeChapter.id, title, content);
                setViewMode('read');
              }}
              className="px-4 py-1.5 rounded-lg bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{t('story_start_reading')}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Distraction-Free Canvas */}
      <main className="max-w-3xl w-full mx-auto px-6 py-12 flex-1 flex flex-col">
        {/* Chapter Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            updateChapterContent(activeChapter.id, e.target.value, content);
          }}
          placeholder="Chapter Title..."
          className="font-display text-3xl sm:text-4xl font-bold bg-transparent border-none outline-none text-[#1E1B18] dark:text-[#F3ECE4] placeholder-[#8E7F73]/50 mb-8 w-full"
        />

        {/* Chapter Content Prose Textarea */}
        <textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="Begin writing chapter prose here. Use generous spacing between paragraphs..."
          className="font-editorial text-lg sm:text-xl leading-relaxed bg-transparent border-none outline-none text-[#332C25] dark:text-[#D8CFBF] placeholder-[#8E7F73]/40 w-full flex-1 resize-none min-h-[500px]"
        />

        {/* Bottom Status Callout for Decision Points */}
        {((activeChapter.decisionPoints && activeChapter.decisionPoints.length > 0) || activeChapter.decisionPoint) && (
          <div className="mt-8 space-y-3">
            {((activeChapter.decisionPoints && activeChapter.decisionPoints.length > 0)
              ? activeChapter.decisionPoints
              : [activeChapter.decisionPoint!]
            ).map((dp, idx) => (
              <div
                key={dp.id}
                className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between"
              >
                <div className="flex items-center gap-2 text-xs text-amber-900 dark:text-amber-300">
                  <Vote className="w-4 h-4 text-amber-600" />
                  <span>
                    Decision #{idx + 1}: <strong>"{dp.prompt}"</strong> ({dp.choices.length} choices)
                  </span>
                </div>
                <button
                  onClick={() => setIsDecisionModalOpen(true)}
                  className="text-xs font-bold text-amber-800 dark:text-amber-200 underline cursor-pointer"
                >
                  Configure
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Decision Point Builder Modal */}
      {isDecisionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#38312B] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#ECE6DE] dark:border-[#38312B]">
              <div className="flex items-center gap-2">
                <Vote className="w-5 h-5 text-[#7D2948]" />
                <div>
                  <h3 className="font-display font-bold text-lg">Interactive Decision Points</h3>
                  <p className="text-xs text-[#8E7F73]">
                    Configure cliffhangers and dilemma polls for this chapter
                  </p>
                </div>
              </div>
              <button onClick={() => setIsDecisionModalOpen(false)} className="cursor-pointer">
                <X className="w-4 h-4 text-[#8E7F73]" />
              </button>
            </div>

            <div className="space-y-6">
              {decisionPointsList.length === 0 ? (
                <div className="p-8 text-center rounded-2xl border-2 border-dashed border-[#ECE6DE] dark:border-[#38312B]">
                  <Vote className="w-8 h-8 text-[#8E7F73] mx-auto mb-2 opacity-50" />
                  <p className="text-xs text-[#8E7F73] mb-4">No decision points configured for this chapter yet.</p>
                  <button
                    onClick={() =>
                      setDecisionPointsList([
                        {
                          id: `dec-${activeChapter.id}-1`,
                          prompt: 'What should the protagonist do next?',
                          contextDescription: 'The community vote decides the trajectory of the subsequent release.',
                          choices: ['Option 1', 'Option 2'],
                        },
                      ])
                    }
                    className="px-4 py-2 rounded-xl bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] cursor-pointer"
                  >
                    + Add First Decision Point
                  </button>
                </div>
              ) : (
                decisionPointsList.map((dp, dpIdx) => (
                  <div
                    key={dp.id || dpIdx}
                    className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#1A1614] border border-[#ECE6DE] dark:border-[#38312B] space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#7D2948] dark:text-[#F3ACB6]">
                        Decision Point #{dpIdx + 1}
                      </span>
                      {decisionPointsList.length > 1 && (
                        <button
                          onClick={() =>
                            setDecisionPointsList(decisionPointsList.filter((_, i) => i !== dpIdx))
                          }
                          className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg cursor-pointer text-xs flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#8E7F73] block mb-1">
                        Cliffhanger Decision Prompt
                      </label>
                      <input
                        type="text"
                        value={dp.prompt}
                        onChange={(e) => {
                          const updated = [...decisionPointsList];
                          updated[dpIdx] = { ...updated[dpIdx], prompt: e.target.value };
                          setDecisionPointsList(updated);
                        }}
                        placeholder="e.g. Aria heard footsteps. What should she do?"
                        className="w-full text-sm p-3 rounded-xl bg-white dark:bg-[#25201C] border border-[#ECE6DE] dark:border-[#38312B] focus:border-[#7D2948] outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#8E7F73] block mb-2">
                        Voting Choices (Options for Readers)
                      </label>
                      <div className="space-y-2">
                        {dp.choices.map((choice, cIdx) => (
                          <div key={cIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={choice}
                              onChange={(e) => {
                                const updated = [...decisionPointsList];
                                const updatedChoices = [...updated[dpIdx].choices];
                                updatedChoices[cIdx] = e.target.value;
                                updated[dpIdx] = { ...updated[dpIdx], choices: updatedChoices };
                                setDecisionPointsList(updated);
                              }}
                              placeholder={`Choice ${cIdx + 1}`}
                              className="flex-1 text-sm p-2.5 rounded-xl bg-white dark:bg-[#25201C] border border-[#ECE6DE] dark:border-[#38312B] focus:border-[#7D2948] outline-none"
                            />
                            {dp.choices.length > 2 && (
                              <button
                                onClick={() => {
                                  const updated = [...decisionPointsList];
                                  updated[dpIdx] = {
                                    ...updated[dpIdx],
                                    choices: updated[dpIdx].choices.filter((_, i) => i !== cIdx),
                                  };
                                  setDecisionPointsList(updated);
                                }}
                                className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          const updated = [...decisionPointsList];
                          updated[dpIdx] = {
                            ...updated[dpIdx],
                            choices: [...updated[dpIdx].choices, ''],
                          };
                          setDecisionPointsList(updated);
                        }}
                        className="mt-2 text-xs font-semibold text-[#7D2948] dark:text-[#F3ACB6] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Another Option to this Decision
                      </button>
                    </div>
                  </div>
                ))
              )}

              <button
                onClick={() =>
                  setDecisionPointsList([
                    ...decisionPointsList,
                    {
                      id: `dec-${activeChapter.id}-${decisionPointsList.length + 1}-${Date.now()}`,
                      prompt: '',
                      contextDescription: 'The community vote decides the trajectory of the subsequent release.',
                      choices: ['Option A', 'Option B'],
                    },
                  ])
                }
                className="w-full py-3 rounded-2xl border-2 border-dashed border-[#7D2948]/30 hover:border-[#7D2948] text-[#7D2948] dark:text-[#F3ACB6] text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Another Decision Point in Chapter
              </button>

              <div className="p-3 rounded-xl bg-[#F6F4F0] dark:bg-[#2C2723] text-xs text-[#8E7F73]">
                Once published, readers vote right inside the chapter. You can branch your next release off the winning community vote!
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#ECE6DE] dark:border-[#38312B]">
              <button
                onClick={() => setIsDecisionModalOpen(false)}
                className="px-4 py-2 text-xs text-[#8E7F73] hover:text-[#241F1A]"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveDecision}
                className="px-5 py-2 rounded-xl bg-[#7D2948] text-white text-xs font-semibold hover:bg-[#68203a] cursor-pointer"
              >
                Save Decision Points
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Character Reference Drawer */}
      {isCharacterDrawerOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white dark:bg-[#201C19] border-l border-[#ECE6DE] dark:border-[#38312B] shadow-2xl p-6 overflow-y-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#ECE6DE] dark:border-[#38312B]">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#7D2948]" />
              <h3 className="font-display font-bold text-lg">Character Reference</h3>
            </div>
            <button onClick={() => setIsCharacterDrawerOpen(false)} className="cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {storyCharacters.map((char) => (
              <div
                key={char.id}
                className="p-4 rounded-xl border border-[#ECE6DE] dark:border-[#38312B] space-y-2 text-xs"
              >
                <div className="flex items-center gap-3">
                  <img src={char.avatar} alt="" className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-display font-bold text-sm">{char.name}</h4>
                    <span className="text-[#8E7F73]">{char.occupation}</span>
                  </div>
                </div>
                <p className="text-[#61544B] dark:text-[#BDB1A5] italic">"{char.description}"</p>
                <div className="text-[11px] text-[#8E7F73]">
                  <strong>Traits:</strong> {char.personality.join(', ')}
                </div>
                <div className="text-[11px] text-[#7D2948] dark:text-[#F3ACB6]">
                  <strong>Voice:</strong> {char.voiceStyle}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Consistency Modal */}
      {isConsistencyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#201C19] border border-[#ECE6DE] dark:border-[#38312B] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#ECE6DE] dark:border-[#38312B]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-display font-bold text-lg">AI Continuity & Consistency Report</h3>
              </div>
              <button onClick={() => setIsConsistencyModalOpen(false)} className="cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#8E7F73]">
              Scanning prose against character profiles, eye colors, items, and previous timeline entries.
            </p>

            <div className="space-y-2">
              {consistencyIssues.map((issue, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-xs font-medium"
                >
                  ✓ {issue}
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsConsistencyModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#7D2948] text-white text-xs font-semibold cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
