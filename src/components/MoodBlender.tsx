import React, { useState } from "react";
import { HelpCircle, Sparkles, X, Heart, RotateCcw, BookOpen, Coffee, Smile, Moon, Sun } from "lucide-react";

interface MoodBlenderProps {
  soundEnabled: boolean;
}

// simple array, it lists the moods and it works perfectly
const WORDS = [
  "Happy", "Sad", "Energetic", "Chill", 
  "Anxious", "Excited", "Zen", "Moody", 
  "Curious", "Mystical"
];

// lowkey proud of this colour palette, as a Femboy I love pastel
const WORD_TILES: Record<string, { bg: string; text: string; hover: string; border: string }> = {
  "Happy": { bg: "bg-[#ffe0be]", text: "text-[#7d390a]", hover: "hover:bg-[#fbcfa0]", border: "border-[#e4ac7a]" },
  "Sad": { bg: "bg-[#cde4f5]", text: "text-[#1b3d5c]", hover: "hover:bg-[#b5d5ed]", border: "border-[#9bbad5]" },
  "Energetic": { bg: "bg-[#fde2a6]", text: "text-[#6e500b]", hover: "hover:bg-[#fcd386]", border: "border-[#dbb562]" },
  "Chill": { bg: "bg-[#cbe8cb]", text: "text-[#1d4f21]", hover: "hover:bg-[#b0dbae]", border: "border-[#96c294]" },
  "Anxious": { bg: "bg-[#eed5f5]", text: "text-[#4c2154]", hover: "hover:bg-[#e2bff0]", border: "border-[#cc9be0]" },
  "Excited": { bg: "bg-[#fcfca6]", text: "text-[#614f10]", hover: "hover:bg-[#fdfb82]", border: "border-[#ded95d]" },
  "Zen": { bg: "bg-[#bdebe7]", text: "text-[#104d49]", hover: "hover:bg-[#9ee1dc]", border: "border-[#7dcfc7]" },
  "Moody": { bg: "bg-[#f7d0d7]", text: "text-[#611f2c]", hover: "hover:bg-[#f6b7c2]", border: "border-[#db95a2]" },
  "Curious": { bg: "bg-[#d2d9f9]", text: "text-[#1c246e]", hover: "hover:bg-[#b9c3f7]", border: "border-[#9ba8e8]" },
  "Mystical": { bg: "bg-[#e6dafb]", text: "text-[#321c5c]", hover: "hover:bg-[#d1bff9]", border: "border-[#b89ded]" }
};

// spaghetti block for figuring out what cards to show
function evaluateExpression(expr: string): {
  vibeSummary: string;
  emoji: string;
  bgColors: string;
  titleColor: string;
  details: string;
} {
  const clean = expr.toLowerCase();
  
  if (!clean.trim()) {
    return {
      vibeSummary: "Quiet Hearth",
      emoji: "🏡",
      bgColors: "bg-[#faf6ee] border-[#ebdcc2]",
      titleColor: "text-[#544332]",
      details: "Sip warm tea and select cozy emotional pads below to gather raw vibe ingredients for evaluation."
    };
  }

  // lots of combo checks, don't look too closely or you'll trigger my imposter syndrome lmao
  if (clean.includes("happy") && clean.includes("chill")) {
    return {
      vibeSummary: "Sunny Meadow Glade",
      emoji: "🌼",
      bgColors: "bg-radial from-[#fff9eb] to-[#ebf5e8] border-[#dfebd3]",
      titleColor: "text-[#427b47]",
      details: "Your spirit resides in a Sunny Meadow Glade! A warm picnic blanket draped under towering maple trees with gentle butterflies, humming honeybees, and dandelion dust drifting in gold light."
    };
  }
  if (clean.includes("energetic") && clean.includes("excited")) {
    return {
      vibeSummary: "Warm Spice Harvest",
      emoji: "🪵",
      bgColors: "bg-gradient-to-br from-[#faf1da] to-[#fdf0e2] border-[#eed1b5]",
      titleColor: "text-[#b4652c]",
      details: "Your spirit is alive with a Spice Harvest! Joyful apples boiling in dynamic cider, the sparkling scents of cinnamon cloves, and crackling fireplaces filling your cottage hearth with festive warmth."
    };
  }
  if (clean.includes("sad") && clean.includes("moody")) {
    return {
      vibeSummary: "Dappled Ivy Rain",
      emoji: "🌧️",
      bgColors: "bg-[#f2f4f8] border-[#ccd4df]",
      titleColor: "text-[#476c8e]",
      details: "Your spirit embraces soft, quiet shadows. Rain droplets echoing on slate greenhouse shingles, deep indigo ink recording daily logs, and hot chamomile tea steamed on old cast iron stoves."
    };
  }
  if (clean.includes("zen") && clean.includes("mystical")) {
    return {
      vibeSummary: "Lavender Stardust",
      emoji: "🔮",
      bgColors: "bg-[#f6f2fb] border-[#ddcbed]",
      titleColor: "text-[#67489e]",
      details: "Your spirit is bathed in Lavender Stardust. Wisps of dried lavender flowers clearing static, glowing amber crystal matrices warming your windowsill, and peaceful midnight forest paths echoing soft crickets."
    };
  }
  if (clean.includes("anxious") && clean.includes("moody")) {
    return {
      vibeSummary: "Flickering Amber Hearth",
      emoji: "☕",
      bgColors: "bg-[#faf2ec] border-[#ebd3c5]",
      titleColor: "text-[#914d59]",
      details: "Your spirit is seeking soft comfort. Keep wrap in velvet wool knits while watching cozy oak embers crackle and dance inside your mossy stone stove. Take a slow, sweet breath."
    };
  }
  if (clean.includes("happy") && clean.includes("excited")) {
    return {
      vibeSummary: "Wildflower Fairgrounds",
      emoji: "🌸",
      bgColors: "bg-[#fdf6f7] border-[#ecd3d6]",
      titleColor: "text-[#995562]",
      details: "Your spirit resembles a Wildflower Fairground! Adorably tucked pink petunias dangling from cozy flower boxes, handwritten letter envelopes sealed with wax, and baskets overflowing with sweet forest berries."
    };
  }
  if (clean.includes("sad") && clean.includes("zen")) {
    return {
      vibeSummary: "Peaceful Misty Pond",
      emoji: "🍃",
      bgColors: "bg-[#eff5f3] border-[#ccdcd2]",
      titleColor: "text-[#2e7974]",
      details: "Your spirit is beautifully still. Heavy dew dampening sweet garden leaves, tiny lilypads floating over glassy mossy water, and the distant calming chime of old grandfather clocks."
    };
  }
  if (clean.includes("energetic") && clean.includes("mystical")) {
    return {
      vibeSummary: "Enchanted Grove Path",
      emoji: "🦊",
      bgColors: "bg-[#fafaf0] border-[#e7e7cf]",
      titleColor: "text-[#7b7a42]",
      details: "Your spirit traces an Enchanted Secret path! Fluffy ginger forest foxes winking as they leap through ancient willow gates, glowing golden mushrooms lighting up a blanket of emerald velvet moss."
    };
  }

  // fallback single options
  if (clean.includes("happy")) {
    return {
      vibeSummary: "Golden Sunflower Patch",
      emoji: "🌻",
      bgColors: "bg-[#fefbe9] border-[#eddba8]",
      titleColor: "text-[#9f7924]",
      details: "Affirmation: Joy is within your nature! Like bright sunflowers turning to drink the honeyed daylight, you are glowing with soft, welcoming warmth."
    };
  }
  if (clean.includes("sad")) {
    return {
      vibeSummary: "Soft Velvet Moss",
      emoji: "🧸",
      bgColors: "bg-[#f2f5fa] border-[#c0d0e4]",
      titleColor: "text-[#476c8e]",
      details: "Affirmation: Rest and grow at your own cozy pace. Like soft moss hugging old cobblestone paths in quiet woodlands, you are safe, grounding, and loved."
    };
  }
  if (clean.includes("energetic")) {
    return {
      vibeSummary: "Wild Bee Flight",
      emoji: "🐝",
      bgColors: "bg-[#fdfced] border-[#edd1a8]",
      titleColor: "text-[#b4652c]",
      details: "Affirmation: Creative currents flow through you! Let your warm excitement buzz like busy bees gathering clover sweet nectars to feed a cozy winter hive."
    };
  }
  if (clean.includes("chill")) {
    return {
      vibeSummary: "Warm Chamomile Sipper",
      emoji: "🍵",
      bgColors: "bg-[#f5f9f0] border-[#cce5cf]",
      titleColor: "text-[#3e7e44]",
      details: "Affirmation: Time is yours to savor. Unwind and relax like dried sweet clover buds dissolving slowly inside a hand-thrown ceramic mug."
    };
  }
  if (clean.includes("anxious")) {
    return {
      vibeSummary: "Resting Rabbit Den",
      emoji: "🐇",
      bgColors: "bg-[#fbfaef] border-[#e8ebd3]",
      titleColor: "text-[#7a7839]",
      details: "Affirmation: Wrap under fluffy cotton sheets. Ground yourself like a velvet rabbit nestled safely in deep, quiet burrows, listening to the soft rustling barley fields."
    };
  }
  if (clean.includes("excited")) {
    return {
      vibeSummary: "Singing Bluebirds",
      emoji: "🐦",
      bgColors: "bg-[#f0f6fa] border-[#ccdced]",
      titleColor: "text-[#397da6]",
      details: "Affirmation: Your heart holds delicious songs! Welcome dynamic surprises like wild bluebirds chirping on garden trellises waiting for sweet morning seeds."
    };
  }
  if (clean.includes("zen")) {
    return {
      vibeSummary: "Cedarwood Temple",
      emoji: "🧘",
      bgColors: "bg-[#e5f5f4] border-[#cce5e2]",
      titleColor: "text-[#2e7974]",
      details: "Affirmation: Peace is a shelter inside you. Find center like aged fragrant cedar posts holding strong and quiet against endless winter storms."
    };
  }
  if (clean.includes("moody")) {
    return {
      vibeSummary: "Overcast Peat Moss",
      emoji: "🍂",
      bgColors: "bg-[#f6ebd9] border-[#e7ccb5]",
      titleColor: "text-[#805030]",
      details: "Affirmation: Seasons change beautifully. Embrace cozy, moody twilights as sweet soil preparations for next spring's golden sprouts."
    };
  }
  if (clean.includes("curious")) {
    return {
      vibeSummary: "Vintage Scrapbooker",
      emoji: "📖",
      bgColors: "bg-[#f4f3ff] border-[#ddddec]",
      titleColor: "text-[#5e4bcf]",
      details: "Affirmation: Your world is a beautiful journal. Seek wonderful tiny treasures like pressed bluebells and vintage postcards tucked between dusty canvas volumes."
    };
  }
  if (clean.includes("mystical")) {
    return {
      vibeSummary: "Sweet Herbal Apothecary",
      emoji: "🌿",
      bgColors: "bg-[#f1faef] border-[#cfedcf]",
      titleColor: "text-[#477e47]",
      details: "Affirmation: You are woven with age-old wisdom. Your magical nature blooms when blending dried rosemary bundles, sweet wild honey, and soft stardust wishes."
    };
  }

  // some weird custom mix
  const wordsMatched = WORDS.filter(w => clean.includes(w.toLowerCase()));
  return {
    vibeSummary: "Cottagecore Bouquet",
    emoji: "💐",
    bgColors: "bg-[#faf6ee] border-[#e9dfcf]",
    titleColor: "text-[#73604b]",
    details: `Your cozy formula contains beautiful, wild, handpicked emotional herbs: ${wordsMatched.join(" + ")}. Let this lovely garden bouquet warm your mind!`
  };
}

// styling for dark mode users, because dark mode makes my brain stop hurting lol
function getAdaptedTitleColor(lightClass: string, isDark: boolean): string {
  if (!isDark) return lightClass;
  const mapping: Record<string, string> = {
    "text-[#544332]": "text-[#ebdcc2]",
    "text-[#427b47]": "text-[#aae8aa]",
    "text-[#b4652c]": "text-[#ffd0a6]",
    "text-[#476c8e]": "text-[#bfe0ff]",
    "text-[#67489e]": "text-[#ebd0ff]",
    "text-[#914d59]": "text-[#ffbbca]",
    "text-[#995562]": "text-[#ffc7d3]",
    "text-[#2e7974]": "text-[#9dfadc]",
    "text-[#7b7a42]": "text-[#fbfc9f]",
    "text-[#9f7924]": "text-[#ffe596]",
    "text-[#3e7e44]": "text-[#abf7ab]",
    "text-[#7a7839]": "text-[#edf09c]",
    "text-[#397da6]": "text-[#b2e5fc]",
    "text-[#805030]": "text-[#ffe6cc]",
    "text-[#5e4bcf]": "text-[#d7c9ff]",
    "text-[#477e47]": "text-[#acf2ac]",
    "text-[#73604b]": "text-[#e3dcd5]"
  };
  return mapping[lightClass] || "text-[#fcd386]";
}

// nice muddy brown tone
function getAdaptedBgColor(lightClass: string, isDark: boolean): string {
  if (!isDark) return lightClass;
  return "bg-[#453022] border-[#594232] text-[#fbeee0]";
}

export default function MoodBlender({ soundEnabled }: MoodBlenderProps) {
  const [expression, setExpression] = useState("");
  const [showInstructions, setShowInstructions] = useState(true);
  const [finalResult, setFinalResult] = useState<ReturnType<typeof evaluateExpression> | null>(null);

  // localstorage save stuff here, hopefully it doesnt break on refresh
  const [isAlchemistDark, setIsAlchemistDark] = useState(() => {
    return localStorage.getItem("alchemist-dark") === "true";
  });

  const handleToggleDark = () => {
    const newVal = !isAlchemistDark;
    setIsAlchemistDark(newVal);
    localStorage.setItem("alchemist-dark", String(newVal));
    if (soundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(261.63, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
      } catch (e) {
        console.log("Audio contextual playback blocked or unsupported");
      }
    }
  };

  const handleWordTap = (word: string) => {
    if (soundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(261.63, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
      } catch (e) {
        console.log("Audio contextual playback blocked or unsupported");
      }
    }
    setExpression((prev) => {
      const cleanPrev = prev.trim();
      if (!cleanPrev) return word;
      return `${cleanPrev} + ${word}`;
    });
  };

  const handleClear = () => {
    if (soundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(261.63, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
      } catch (e) {
        console.log("Audio contextual playback blocked or unsupported");
      }
    }
    setExpression("");
    setFinalResult(null);
  };

  const handleBackspace = () => {
    if (soundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(261.63, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
      } catch (e) {
        console.log("Audio contextual playback blocked or unsupported");
      }
    }
    setExpression((prev) => {
      const parts = prev.split(" + ");
      if (parts.length <= 1) return "";
      return parts.slice(0, -1).join(" + ");
    });
  };

  const handleCalculate = () => {
    if (soundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(261.63, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
      } catch (e) {
        console.log("Audio contextual playback blocked or unsupported");
      }
      setTimeout(() => {
        try {
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(261.63, audioCtx.currentTime);
          gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          oscillator.start();
          oscillator.stop(audioCtx.currentTime + 0.1);
        } catch (e) {
          console.log("Audio contextual playback blocked or unsupported");
        }
      }, 80);
      setTimeout(() => {
        try {
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          const oscillator = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(261.63, audioCtx.currentTime);
          gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          oscillator.start();
          oscillator.stop(audioCtx.currentTime + 0.1);
        } catch (e) {
          console.log("Audio contextual playback blocked or unsupported");
        }
      }, 160);
    }
    const evaluated = evaluateExpression(expression);
    setFinalResult(evaluated);
  };

  return (
    <div className={`flex-grow flex flex-col justify-between p-4.5 transition-colors duration-300 cottage-grid relative overflow-y-auto ${
      isAlchemistDark ? "bg-[#2a1c12] text-[#ebdcc2]" : "bg-[#fdfbf6] text-[#5c4e3c]"
    }`}>
      
      {/* top bar buttons */}
      <div className={`flex items-center justify-between mb-3 border-b pb-2 shrink-0 transition-colors ${
        isAlchemistDark ? "border-[#4a3627]" : "border-[#e1d3bc]/45"
      }`}>
        <div className="flex items-center space-x-2">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
            isAlchemistDark ? "bg-[#3e2b1d] border border-[#593d28]" : "bg-[#ebf5e8] border border-[#d3e5cf]"
          }`}>
            <Heart className="w-2.5 h-2.5 text-[#5e9e5e] fill-[#5e9e5e]" />
          </div>
          <span className={`font-display font-bold text-xs tracking-wider transition-colors ${
            isAlchemistDark ? "text-[#e8dfd5]" : "text-[#7c6953]"
          }`}>
            Mood Blender
          </span>
        </div>
        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleToggleDark}
            className={`p-1.5 rounded-full transition-all cursor-pointer shadow-xs border ${
              isAlchemistDark 
                ? "bg-[#3e2b1d] border-[#593d28] text-amber-400 hover:bg-[#4d3727]" 
                : "bg-[#fcf9f2] border-[#e1d3bc] text-amber-600 hover:bg-[#faf0df]"
            }`}
            title={isAlchemistDark ? "Lighten Hearth View" : "Cozy Dark Night Mode"}
            id="alchemist-darkmode-toggle"
          >
            {isAlchemistDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          <button 
            onClick={() => {
              if (soundEnabled) {
                try {
                  const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                  const oscillator = audioCtx.createOscillator();
                  const gainNode = audioCtx.createGain();
                  oscillator.type = 'sine';
                  oscillator.frequency.setValueAtTime(261.63, audioCtx.currentTime);
                  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
                  oscillator.connect(gainNode);
                  gainNode.connect(audioCtx.destination);
                  oscillator.start();
                  oscillator.stop(audioCtx.currentTime + 0.1);
                } catch (e) {
                  console.log("Audio contextual playback blocked or unsupported");
                }
              }
              setShowInstructions(true);
            }}
            className={`p-1.5 rounded-full transition-all cursor-pointer shadow-xs border ${
              isAlchemistDark
                ? "bg-[#3e2b1d] border-[#593d28] text-stone-300 hover:bg-[#4d3727]"
                : "bg-[#fcf9f2] border-[#e1d3bc] text-[#73604b] hover:text-[#5e9e5e] hover:bg-[#ebf5e8]"
            }`}
            title="Daily Instructions Manual"
            id="alchemist-info-btn"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 space-y-3.5 mb-3.5">
        
        {/* monitoring the formula currently being blended */}
        <div className={`border-2 rounded-2.5xl p-4 min-h-[90px] flex flex-col justify-end relative shadow-xs overflow-hidden transition-colors ${
          isAlchemistDark ? "bg-[#372619] border-[#4d3624]" : "bg-[#faf6ee] border-[#e9dfcf]"
        }`}>
          <div className="absolute top-2.5 right-3.5 flex items-center gap-1.5 opacity-60">
            <Smile className="w-3.5 h-3.5 text-[#a2b99a]" />
            <span className={`text-[9px] font-display font-bold tracking-wider uppercase transition-colors ${
              isAlchemistDark ? "text-[#dfd5c9]" : "text-[#837059]"
            }`}>Vibe Buffer</span>
          </div>

          <span className={`text-[9px] uppercase font-display font-bold tracking-widest block mb-1 transition-colors ${
            isAlchemistDark ? "text-[#dfddda]/60" : "text-[#a8957e]"
          }`}>
            Chained Ingredients:
          </span>
          <div className={`text-xs font-display font-medium overflow-x-auto whitespace-pre pb-1 min-h-[16px] leading-relaxed transition-colors ${
            isAlchemistDark ? "text-[#fbf5ee]" : "text-[#4a3e31]"
          }`}>
            {expression === "" ? (
              <span className={`italic select-none font-light ${isAlchemistDark ? "text-stone-400" : "text-stone-400"}`}>Choose gentle moods below to begin...</span>
            ) : (
              expression
            )}
          </div>
        </div>

        {/* results go here. the sweet cozy affirmation card */}
        <div className={`flex-1 overflow-y-auto border-2 rounded-2.5xl p-4.5 flex flex-col justify-center relative shadow-xs transition-colors ${
          isAlchemistDark ? "bg-[#372619] border-[#4d3624]" : "bg-[#faf6ee] border-[#e9dfcf]"
        }`}>
          
          {finalResult ? (
            <div className={`p-4 rounded-2xl border-2 ${getAdaptedBgColor(finalResult.bgColors, isAlchemistDark)} animate-in fade-in duration-300 flex flex-col space-y-3.5`}>
              <div className="flex items-center space-x-3">
                <span className="text-3xl select-none" role="img" aria-label="Aesthetic signifier">{finalResult.emoji}</span>
                <div>
                  <span className={`text-[8px] font-display font-bold tracking-widest block uppercase ${isAlchemistDark ? "text-stone-300" : "text-[#85705a]"}`}>GARDEN SYNTHESIS</span>
                  <h3 className={`text-sm font-display font-bold uppercase tracking-wider ${getAdaptedTitleColor(finalResult.titleColor, isAlchemistDark)}`}>
                    {finalResult.vibeSummary}
                  </h3>
                </div>
              </div>
              
              <div className={`h-px bg-stone-300/30 line-clamp-1 border-t-2 border-dashed ${isAlchemistDark ? "border-[#5c432d]" : "border-[#e9dfcf]"}`} />
              
              <p className={`text-[12px] leading-relaxed font-sans font-medium italic ${isAlchemistDark ? "text-[#f5ebd7]" : "text-[#544332]"}`}>
                "{finalResult.details}"
              </p>
              
              <div className={`h-px bg-stone-300/30 border-t-2 border-dashed ${isAlchemistDark ? "border-[#5c432d]" : "border-[#e9dfcf]"}`} />
              
              <div className="flex items-center space-x-1 text-[9px] font-display text-[#7d9077] uppercase tracking-wider font-bold">
                <Sparkles className="w-3 h-3 text-[#a2b99a] animate-pulse" />
                <span className={isAlchemistDark ? "text-[#9ee39e]" : "text-[#7d9077]"}>Affirmative blend complete!</span>
              </div>
            </div>
          ) : (
            <div className="text-center p-4">
              <div className={`w-9 h-9 rounded-full mx-auto mb-2.5 flex items-center justify-center transition-colors ${
                isAlchemistDark ? "bg-[#2a1c12] border border-[#593d28]" : "bg-[#fdfaf2] border border-[#eada72]/10"
              }`}>
                <Coffee className={`w-5 h-5 ${isAlchemistDark ? "text-[#ebdcc2]" : "text-[#a8957e]"}`} />
              </div>
              <p className={`text-[11px] font-display font-bold uppercase tracking-wider ${
                isAlchemistDark ? "text-[#ebdcc2]" : "text-[#8a765e]"
              }`}>Awaiting Blend</p>
              <p className={`text-[10px] font-sans mt-1.5 leading-relaxed ${
                isAlchemistDark ? "text-[#dfd5c9]" : "text-[#9a8670]"
              }`}>
                Click the pastel tiles below, then tap <strong className={isAlchemistDark ? "text-[#7bbf7b] font-bold" : "text-[#a2b99a] font-bold"}>COMPUTE VIBE =</strong> to brew a sweet, cozy cottage daily affirmation card!
              </p>
            </div>
          )}
        </div>

      </div>

      {/* cute grid of pastel keys */}
      <div className="space-y-2.5 shrink-0">
        
        <div className="grid grid-cols-3 gap-2">
          {WORDS.slice(0, 9).map((word) => {
            const tileStyle = WORD_TILES[word] || WORD_TILES["Happy"];
            return (
              <button
                key={word}
                onClick={() => handleWordTap(word)}
                className={`py-3.5 ${tileStyle.bg} ${tileStyle.text} ${tileStyle.hover} border-2 ${tileStyle.border} active:scale-95 rounded-2xl text-[11px] font-display font-bold tracking-wide transition-all cursor-pointer shadow-xs flex items-center justify-center`}
                id={`calc-key-${word.toLowerCase()}`}
              >
                {word}
              </button>
            );
          })}
          
          <button
            onClick={() => handleWordTap(WORDS[9])}
            className={`py-3.5 ${WORD_TILES["Mystical"].bg} ${WORD_TILES["Mystical"].text} ${WORD_TILES["Mystical"].hover} border-2 ${WORD_TILES["Mystical"].border} active:scale-95 rounded-2xl text-[11px] font-display font-bold tracking-wide transition-all cursor-pointer shadow-xs`}
            id={`calc-key-${WORDS[9].toLowerCase()}`}
          >
            {WORDS[9]}
          </button>
          
          <button
            onClick={handleClear}
            className={`py-3.5 border-2 active:scale-95 rounded-2xl text-[10px] font-bold font-display transition-colors cursor-pointer text-center uppercase ${
              isAlchemistDark
                ? "bg-[#4a1c18] hover:bg-[#5e2722] text-[#ffc5bf] border-[#7d322a]"
                : "bg-[#fbf0ef] hover:bg-[#fadcd9] text-[#b4564c] hover:text-[#903a31] border-[#edd6d4]"
            }`}
            id="calc-key-clear"
          >
            CLEAR
          </button>

          <button
            onClick={handleBackspace}
            className={`py-3.5 border-2 active:scale-95 rounded-2xl text-[10px] font-bold font-display transition-colors cursor-pointer text-center uppercase ${
              isAlchemistDark
                ? "bg-[#4a361c] hover:bg-[#5e4726] text-[#ffdcb2] border-[#72532d]"
                : "bg-[#fbf5e8] hover:bg-[#f6dfb8] text-[#c28430] hover:text-[#915f1a] border-[#eedeb2]"
            }`}
            id="calc-key-back"
          >
            DEL
          </button>
        </div>

        <button
          onClick={handleCalculate}
          disabled={!expression.trim()}
          className={`w-full py-4 font-bold rounded-2xl text-xs transition-colors shadow-md active:scale-95 uppercase tracking-widest font-display ${
            expression.trim() 
              ? isAlchemistDark
                ? "bg-[#4f834f] hover:bg-[#3f6b3f] text-white border-2 border-[#224422] cursor-pointer"
                : "bg-[#659965] hover:bg-[#528252] text-white border-2 border-[#3c6a3c] cursor-pointer"
              : isAlchemistDark
                ? "bg-[#251b14] text-stone-600 border-2 border-[#3e2b1d] cursor-not-allowed"
                : "bg-[#faf8f4] text-stone-400 border-2 border-[#ebdcc2]/40 cursor-not-allowed"
          } text-center`}
          id="alchemist-calculate"
        >
          COMPUTE VIBE =
        </button>
      </div>

      {/* little guidebook popup modal */}
      {showInstructions && (
        <div className={`absolute inset-0 z-50 backdrop-blur-md flex items-center justify-center p-4 transition-colors ${
          isAlchemistDark ? "bg-black/65" : "bg-[#ebdcc2]/65"
        }`}>
          <div className={`border-2 rounded-3xl max-w-[275px] w-full p-5 flex flex-col shadow-xl relative animate-in fade-in zoom-in-95 duration-200 ${
            isAlchemistDark ? "bg-[#332115] border-[#593d28]" : "bg-[#faf6ee] border-[#d7cbba]"
          }`}>
            
            <button
              onClick={() => {
                if (soundEnabled) {
                  try {
                    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                    const oscillator = audioCtx.createOscillator();
                    const gainNode = audioCtx.createGain();
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(261.63, audioCtx.currentTime);
                    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
                    oscillator.connect(gainNode);
                    gainNode.connect(audioCtx.destination);
                    oscillator.start();
                    oscillator.stop(audioCtx.currentTime + 0.1);
                  } catch (e) {
                    console.log("Audio contextual playback blocked or unsupported");
                  }
                }
                setShowInstructions(false);
              }}
              className={`absolute top-4 right-4 transition-colors cursor-pointer p-0.5 rounded-full ${
                isAlchemistDark ? "text-stone-400 hover:text-stone-200 hover:bg-[#4d3727]/50" : "text-stone-400 hover:text-stone-700 hover:bg-stone-200/50"
              }`}
            >
              <X className="w-4 h-4" />
            </button>
 
            <div className={`flex items-center space-x-2 border-b-2 border-dashed pb-2.5 mb-3 shrink-0 ${
              isAlchemistDark ? "border-[#4a3627]" : "border-[#e9dfcf]"
            }`}>
              <BookOpen className="w-5 h-5 text-[#a2b99a]" />
              <h2 className={`font-display font-bold text-xs tracking-wide uppercase ${
                isAlchemistDark ? "text-[#ebdcc2]" : "text-[#73604b]"
              }`}>
                Garden Guide
              </h2>
            </div>

            <div className={`space-y-3 text-[11px] leading-relaxed font-sans font-medium ${
              isAlchemistDark ? "text-[#dfd5c9]" : "text-stone-600"
            }`}>
              <p>
                Welcome to the <strong className={`${isAlchemistDark ? "text-[#7bbf7b]" : "text-[#3e7e44]"} font-display font-medium`}>Mood Blender</strong> applet!
              </p>

              <div>
                <span className={`font-display text-[9px] font-bold block uppercase tracking-wide mb-1 ${
                  isAlchemistDark ? "text-[#e5a069]" : "text-[#b4652c]"
                }`}>To Alchemize:</span>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>Tap the beautifully colored emotional mood tiles.</li>
                  <li>Watch them chain as your local garden botanical recipes.</li>
                  <li>Press <strong className={isAlchemistDark ? "text-[#7bbf7b]" : "text-[#3e7e44]"}>COMPUTE VIBE =</strong> to immediately brew a warm daily affirmation card!</li>
                </ol>
              </div>

              <div className={`border rounded-xl p-2 text-center text-[10px] font-medium font-display leading-tight flex items-center justify-center space-x-1 ${
                isAlchemistDark ? "bg-[#25381f] border-[#395e2f] text-[#86ce7b]" : "bg-[#ebf5e8] border-[#d3e5cf] text-[#427b47]"
              }`}>
                <span>🌱 100% offline local privacy sync</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (soundEnabled) {
                  try {
                    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
                    const oscillator = audioCtx.createOscillator();
                    const gainNode = audioCtx.createGain();
                    oscillator.type = 'sine';
                    oscillator.frequency.setValueAtTime(261.63, audioCtx.currentTime);
                    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
                    oscillator.connect(gainNode);
                    gainNode.connect(audioCtx.destination);
                    oscillator.start();
                    oscillator.stop(audioCtx.currentTime + 0.1);
                  } catch (e) {
                    console.log("Audio contextual playback blocked or unsupported");
                  }
                }
                setShowInstructions(false);
              }}
              className="mt-4.5 w-full py-2.5 bg-[#a2b99a] hover:bg-[#8ca584] text-white font-bold text-[10px] tracking-wider font-display rounded-xl transition-all cursor-pointer text-center uppercase shadow-xs active:scale-95"
              id="calc-close-modal"
            >
              Start Blending
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
