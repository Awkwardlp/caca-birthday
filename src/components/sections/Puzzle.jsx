import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trophy, ChevronRight } from 'lucide-react';
import Confetti from 'react-confetti';
import data from '../../data.json';
import Sprinkles from '../Sprinkles';
import StoryScroll, { StoryScrollItem } from '../StoryScroll';

const DIRECTION_LABEL = { across: '→ Mendatar', down: '↓ Menurun' };
const ACCENT_COLORS = ['#a855f7', '#f472b6', '#60a5fa', '#fbbf24'];

export default function Puzzle() {
  const [grid, setGrid] = useState([]);
  const [userInputs, setUserInputs] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeClue, setActiveClue] = useState(null); // index of highlighted clue

  const words = data.puzzle.words;

  /* ── Build grid ─────────────────────────────────────────── */
  useEffect(() => {
    let maxRow = 0, maxCol = 0;
    const map = new Map();

    words.forEach((wordObj, wIdx) => {
      const { answer, row, col, direction } = wordObj;
      for (let i = 0; i < answer.length; i++) {
        const r = direction === 'down' ? row + i : row;
        const c = direction === 'across' ? col + i : col;
        maxRow = Math.max(maxRow, r);
        maxCol = Math.max(maxCol, c);
        const key = `${r}-${c}`;
        if (!map.has(key)) map.set(key, { r, c, correctChar: answer[i], words: [wIdx] });
        else map.get(key).words.push(wIdx);
      }
    });

    const newGrid = Array(maxRow + 1).fill(null).map(() => Array(maxCol + 1).fill(null));
    for (const [, cell] of map.entries()) newGrid[cell.r][cell.c] = cell;
    setGrid(newGrid);
  }, [words]);

  /* ── Input & win check ──────────────────────────────────── */
  const handleChange = (r, c, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newInputs = { ...userInputs, [`${r}-${c}`]: value.toUpperCase() };
    setUserInputs(newInputs);

    let allCorrect = true;
    outer: for (let ri = 0; ri < grid.length; ri++) {
      for (let ci = 0; ci < grid[ri]?.length; ci++) {
        const cell = grid[ri][ci];
        if (cell && (newInputs[`${ri}-${ci}`] || '') !== cell.correctChar) {
          allCorrect = false;
          break outer;
        }
      }
    }
    if (allCorrect && grid.length > 0) setIsSuccess(true);
  };

  /* ── Which cells belong to a clue ──────────────────────── */
  const getCellsForClue = (wIdx) => {
    const { answer, row, col, direction } = words[wIdx];
    return Array.from({ length: answer.length }, (_, i) => ({
      r: direction === 'down' ? row + i : row,
      c: direction === 'across' ? col + i : col,
    }));
  };

  const isCellHighlighted = (rIdx, cIdx) => {
    if (activeClue === null) return false;
    return getCellsForClue(activeClue).some(({ r, c }) => r === rIdx && c === cIdx);
  };

  /* ── Which clue number starts at this cell ──────────────── */
  const clueNumberAt = (rIdx, cIdx) => {
    const idx = words.findIndex(({ row, col }) => row === rIdx && col === cIdx);
    return idx >= 0 ? idx + 1 : null;
  };

  return (
    <section id="puzzle" className="py-25 relative overflow-hidden">
      <Sprinkles set="default" />
      {isSuccess && <Confetti recycle={false} numberOfPieces={600} colors={['#a855f7', '#f472b6', '#fcd34d', '#60a5fa']} />}

      <div className="max-w-5xl mx-auto px-3 sm:px-4 relative z-10">

        {/* ── Header ── */}
        <StoryScroll className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-white/25 backdrop-blur-md border border-white/25 rounded-full px-5 py-2 mb-6">
            {/* <Sparkles className="w-4 h-4 text-yellow-300" /> */}
            <Trophy className="w-4 h-4 text-yellow-300" />
            <span className="text-white/80 text-sm font-semibold tracking-wider uppercase">Puzzle</span>
          </div>
          <h2 className="text-4xl text-3d md:text-5xl font-black text-white drop-shadow-lg mb-3">
            Crossword Puzzle
          </h2>
          <p className="text-white/70 text-lg font-medium">
            Kalo bener semua, aku beliin eskrim! 🍦
          </p>
        </StoryScroll>

        {/* ── Main layout: stacked on mobile, side-by-side on desktop ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center">

          {/* ── Crossword Grid ── */}
          <StoryScrollItem delay={0.2} distance={30} className="w-full lg:flex-1 flex">
            <div
              className="w-full flex flex-col bg-white/85 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-white/60 overflow-hidden"
              style={{ padding: '24px' }}
            >
              {/* Grid label */}
              <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-6 text-center">Isi kotak di bawah ini</p>

              <div className="flex-1 overflow-x-auto flex items-center justify-center">
                <div>
                  {grid.map((row, rIdx) => (
                    <div key={`row-${rIdx}`} style={{ display: 'flex', gap: '6px', marginBottom: '6px' }}>
                      {row.map((cell, cIdx) => {
                        const clueNum = cell ? clueNumberAt(rIdx, cIdx) : null;
                        const highlight = cell ? isCellHighlighted(rIdx, cIdx) : false;
                        const correct = cell && isSuccess;

                        /* Responsive cell size: clamp between 38px (mobile) and 54px (desktop) */
                        const cellSize = 'clamp(38px, 9vw, 54px)';

                        return cell ? (
                          <div key={`${rIdx}-${cIdx}`} style={{ position: 'relative', width: cellSize, height: cellSize, flexShrink: 0 }}>
                            {/* Clue number badge */}
                            {clueNum && (
                              <span style={{
                                position: 'absolute', top: '3px', left: '5px',
                                fontSize: '11px', fontWeight: 900,
                                color: highlight ? '#7e22ce' : '#a855f7',
                                lineHeight: 1, zIndex: 2, pointerEvents: 'none',
                              }}>
                                {clueNum}
                              </span>
                            )}
                            <input
                              type="text"
                              inputMode="text"
                              autoComplete="off"
                              autoCorrect="off"
                              autoCapitalize="characters"
                              maxLength={1}
                              value={userInputs[`${rIdx}-${cIdx}`] || ''}
                              onChange={(e) => handleChange(rIdx, cIdx, e.target.value)}
                              style={{
                                width: '100%', height: '100%',
                                textAlign: 'center',
                                fontSize: 'clamp(16px, 4vw, 24px)',
                                fontWeight: 900,
                                textTransform: 'uppercase',
                                borderRadius: '12px',
                                border: correct ? '2px solid #22c55e'
                                  : highlight ? '2px solid #c084fc'
                                    : '2px solid #cbd5e1',
                                background: correct ? 'linear-gradient(135deg, #dcfce7, #f0fdf4)'
                                  : highlight ? 'linear-gradient(135deg, #f3e8ff, #fce7f3)'
                                    : 'linear-gradient(180deg, #ffffff, #f8fafc)',
                                color: correct ? '#15803d' : '#7e22ce',
                                outline: 'none',
                                boxShadow: correct ? '0 4px 15px rgba(34,197,94,0.3), inset 0 -3px 0 rgba(34,197,94,0.2)'
                                  : highlight ? '0 0 0 4px rgba(168,85,247,0.2), 0 6px 12px rgba(168,85,247,0.15), inset 0 -3px 0 rgba(192,132,252,0.3)'
                                    : '0 4px 6px rgba(0,0,0,0.03), inset 0 -3px 0 rgba(203,213,225,0.4)',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                cursor: 'text',
                                WebkitAppearance: 'none',
                                MozAppearance: 'none',
                                paddingBottom: '3px',
                              }}
                              onFocus={() => {
                                const clueIdx = words.findIndex((_, wi) =>
                                  getCellsForClue(wi).some(({ r, c }) => r === rIdx && c === cIdx)
                                );
                                setActiveClue(clueIdx >= 0 ? clueIdx : null);
                              }}
                              onBlur={() => setActiveClue(null)}
                            />
                          </div>
                        ) : (
                          <div key={`empty-${rIdx}-${cIdx}`} style={{ width: cellSize, height: cellSize, flexShrink: 0, background: 'transparent' }} />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </StoryScrollItem>

          {/* ── Clues Panel ── */}
          <StoryScrollItem delay={0.4} distance={40} className="w-full lg:w-80 flex-shrink-0 flex">
            <div className="w-full flex flex-col bg-white/85 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/60 overflow-hidden">
              {/* Panel header */}
              <div className="px-6 pt-6 pb-4 border-b border-purple-100 flex-shrink-0">
                <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-1">Petunjuk</p>
                {/* <h3 className="text-xl font-black text-purple-800">Clues</h3> */}
              </div>

              <div className="p-4 space-y-3 flex-1 overflow-y-auto min-h-[300px]">
                {words.map((word, wIdx) => {
                  const isActive = activeClue === wIdx;
                  const accent = ACCENT_COLORS[wIdx % ACCENT_COLORS.length];
                  return (
                    <motion.button
                      key={wIdx}
                      onClick={() => setActiveClue(isActive ? null : wIdx)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-left"
                    >
                      <div
                        className="flex items-start gap-3 p-4 rounded-2xl transition-all duration-200"
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, ${accent}18, ${accent}10)`
                            : 'rgba(255,255,255,0.7)',
                          border: `1.5px solid ${isActive ? accent : 'rgba(233,213,255,0.8)'}`,
                          boxShadow: isActive ? `0 4px 16px ${accent}25` : '0 1px 4px rgba(0,0,0,0.04)',
                        }}
                      >
                        {/* Number badge */}
                        <div
                          className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm text-white shadow-md"
                          style={{ background: accent }}
                        >
                          {wIdx + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Direction tag */}
                          <span
                            className="inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-1"
                            style={{ background: `${accent}20`, color: accent }}
                          >
                            {DIRECTION_LABEL[word.direction]} · {word.answer.length} huruf
                          </span>
                          <p className="text-slate-700 font-semibold text-sm leading-snug">
                            {word.clue}
                          </p>
                        </div>

                        <ChevronRight
                          size={16}
                          className="flex-shrink-0 mt-1 transition-transform"
                          style={{
                            color: accent,
                            transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)',
                            opacity: isActive ? 1 : 0.4,
                          }}
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Reset hint */}
              <div className="px-6 pb-5 pt-3 mt-auto flex-shrink-0 text-center relative z-10 bg-white/50">
                <button
                  onClick={() => { setUserInputs({}); setIsSuccess(false); }}
                  className="text-xs text-slate-400 hover:text-purple-500 transition-colors underline decoration-dotted"
                >
                  Reset jawaban
                </button>
              </div>
            </div>
          </StoryScrollItem>

        </div>
      </div>

      {/* ── Success Modal ── */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md px-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 22 }}
              className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-10 md:p-14 shadow-[0_0_60px_-15px_rgba(168,85,247,0.5)] text-center max-w-md w-full relative overflow-hidden border-[3px] border-white/80"
            >
              {/* <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400" /> */}

              {/* Background gradient blooms */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-pink-400/20 rounded-full blur-3xl pointer-events-none" />

              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="from-pink-100 to-purple-100 flex items-center justify-center mx-auto mb-6"
              >
                <Trophy className="w-12 h-12 text-yellow-500 fill-yellow-400 drop-shadow-sm" />
              </motion.div>

              <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 mb-4 drop-shadow-sm pb-1">
                {data.puzzle.successMessage}
              </h2>

              <p className="text-slate-600 font-medium text-lg mb-10 relative z-10">
                Jangan lupa screenshot buat bukti yaa, truss kirim ke aku, nnti aku kasih eskrimnya!
              </p>

              <button
                onClick={() => setIsSuccess(false)}
                className="relative inline-flex h-14 w-full items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 text-lg font-bold text-white shadow-[0_10px_30px_-10px_rgba(168,85,247,0.6)] transition-all hover:scale-[1.03] hover:shadow-[0_15px_40px_-10px_rgba(168,85,247,0.8)] active:scale-95"
              >
                <span>Okay</span>
                <div className="absolute inset-0 rounded-full ring-2 ring-white/50 pointer-events-none" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
