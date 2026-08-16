import React, { useState } from 'react';
import { useVibeStore } from '../../store/useVibeStore';
import { IdeaItem } from '../../types/project';
import {
  Lightbulb,
  Plus,
  Rocket,
  Trash2,
  Sparkles,
  Clock,
  Code2,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { ScoreBadge } from '../common/ScoreBadge';
import { TechStackTag } from '../common/TechStackTag';

export const IdeaInboxView: React.FC = () => {
  const { ideas, addIdea, promoteIdeaToProject, deleteIdea, showToast } = useVibeStore();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [effort, setEffort] = useState<'weekend' | '1-week' | '2-weeks' | '1-month'>('weekend');
  const [tags, setTags] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);

  const inboxIdeas = ideas.filter((i) => i.status === 'inbox');
  const promotedIdeas = ideas.filter((i) => i.status === 'promoted');

  const handleCapture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast('Title and description are required', 'warning');
      return;
    }

    const tagList = tags ? tags.split(',').map((t) => t.trim()) : ['AI', 'SideProject'];
    addIdea(title, description, effort, tagList);

    setTitle('');
    setDescription('');
    setTags('');
    setIsCapturing(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-amber-400">
            <Lightbulb className="w-5 h-5" />
            <span className="text-xs uppercase font-mono tracking-widest font-bold">
              Idea Pre-Flight Incubator
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
            Idea Inbox
          </h1>
          <p className="text-slate-300 text-xs md:text-sm max-w-2xl leading-relaxed">
            Never lose an AI side-project spark. Capture raw thoughts, let VibeOS evaluate market viability & suggest optimal stack architecture, then promote straight into your active radar when ready to build.
          </p>
        </div>

        <button
          onClick={() => setIsCapturing(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-transform shrink-0"
        >
          <Plus className="w-4 h-4" />
          Capture Idea
        </button>
      </div>

      {/* Quick Capture Input Card */}
      {isCapturing && (
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-amber-500/40 space-y-4 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white font-mono text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Capture Fleeting Side-Project Concept
            </h3>
            <button
              onClick={() => setIsCapturing(false)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Close
            </button>
          </div>

          <form onSubmit={handleCapture} className="space-y-4 text-xs font-mono">
            <div>
              <label className="text-slate-400 block mb-1">Concept Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. AI-Powered SQLite Local Vector Search Desktop Tool"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-slate-400 block mb-1">What problem does this solve?</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe target user persona, pain point, and core MVP loop..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-400 block mb-1">Estimated Effort Target</label>
                <select
                  value={effort}
                  onChange={(e) => setEffort(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="weekend">1 Weekend Hackathon</option>
                  <option value="1-week">1 Week Sprint</option>
                  <option value="2-weeks">2 Weeks Sprint</option>
                  <option value="1-month">1 Month Beta</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="DevTool, SaaS, LocalFirst"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsCapturing(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 shadow-md shadow-amber-500/20"
              >
                Evaluate & Save Idea
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Ideas List Grid */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-300 font-mono uppercase tracking-wider">
          Incubator Queue ({inboxIdeas.length} Active)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {inboxIdeas.map((idea) => (
            <div
              key={idea.id}
              className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-bold text-base text-white font-mono leading-tight">
                    {idea.title}
                  </h3>
                  <ScoreBadge score={idea.viabilityScore} label="Viability" size="sm" />
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{idea.description}</p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {idea.suggestedStack.map((tech) => (
                    <TechStackTag key={tech} name={tech} size="sm" />
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {idea.estimatedEffort}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => deleteIdea(idea.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => promoteIdeaToProject(idea.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs hover:scale-105 shadow-md shadow-emerald-500/20 transition-all"
                  >
                    <Rocket className="w-3.5 h-3.5" />
                    Build Project
                  </button>
                </div>
              </div>
            </div>
          ))}

          {inboxIdeas.length === 0 && !isCapturing && (
            <div className="col-span-full p-12 text-center rounded-3xl bg-slate-900/40 border border-dashed border-slate-800 text-slate-400 text-sm space-y-2">
              <Lightbulb className="w-8 h-8 mx-auto text-amber-500/60" />
              <p>No raw ideas in the incubator yet.</p>
              <button
                onClick={() => setIsCapturing(true)}
                className="text-xs text-amber-400 underline font-mono"
              >
                Capture your first idea
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
