/**
 * Shared types across CueDesk frontend.
 */

export interface AnalysisSummaryData {
  engagement_score: number | null;
  rep_talk_pct: number | null;
  prospect_talk_pct: number | null;
  overall_score: number | null;
  overall_max: number | null;
  methodology: string | null;
  action_item_count: number;
  call_label: string | null;
  headline: string | null;
  prospect_name: string | null;
  prospect_company: string | null;
  prospect_title: string | null;
}


export interface ConversationSummary {
  id: string;
  title: string | null;
  preview: string | null;
  debrief?: Record<string, any> | null;
  speaker_timeline?: SpeakerTimelineEntry[] | null;
  analysis_summary?: AnalysisSummaryData | null;
  created_at: string;
  updated_at: string;
}

export interface SnippetEntry {
  primary: string;
  backup: string;
  moment_type: string;
  snippet_type: string;
  timestamp: string;
}

export interface SpeakerTimelineSegment {
  start_sec: number;
  end_sec: number;
  text: string;
}

export interface SpeakerTimelineEntry {
  speaker_tag: number;
  label: string;
  segments: SpeakerTimelineSegment[];
  total_sec: number;
  pct: number;
}

export interface GoalEntry {
  text: string;
  type?: string;
  completed?: boolean;
  evidence?: string | null;
}

export interface GoalMetrics {
  plan_count: number;
  outcome_count: number;
  completed_count: number;
  added: number;
  removed: number;
  plan_score: number;
  outcome_score: number;
  avg_diff_pct: number;
  plan_goals?: GoalEntry[];
  outcome_goals?: GoalEntry[];
}

export interface ConversationDetail extends ConversationSummary {
  goal: string;
  context_text: string | null;
  goal_metrics?: GoalMetrics | null;
  transcript_entries: Array<{
    text: string;
    speaker: "assisted_user" | "other_party";
    timestamp: string;
  }>;
  snippet_entries?: SnippetEntry[];
}

export interface KeyMoment {
  label: string;
  timestamp_sec: number;
  type: string;
}

export interface TopicSegment {
  topic: string;
  start_sec: number;
  end_sec: number;
  color_index: number;
}

export interface CallQuestion {
  text: string;
  speaker: string;
  timestamp_sec: number;
  is_open: boolean;
}

export interface TalkRatio {
  rep_words: number;
  prospect_words: number;
  rep_pct: number;
  prospect_pct: number;
  benchmark_note: string;
}

export interface SentimentPoint {
  timestamp_sec: number;
  score: number;
}

export interface ScorecardCriterion {
  name: string;
  score: number;
  max_score: number;
}

export interface ScorecardData {
  methodology: string;
  criteria: ScorecardCriterion[];
  overall_score: number;
  overall_max: number;
}

export interface ActionItem {
  text: string;
  assignee: string | null;
  completed: boolean;
}

export interface CallStats {
  word_count: number;
  question_count: number;
  longest_monologue_sec: number;
  engagement_score: number;
}

export interface CallAnalysis {
  headline_summary: string;
  summary_bullets: string[];
  key_moments: KeyMoment[];
  topic_segments: TopicSegment[];
  questions: CallQuestion[];
  talk_ratio: TalkRatio;
  text_sentiment: SentimentPoint[];
  scorecard: ScorecardData;
  action_items: ActionItem[];
  stats: CallStats;
}
