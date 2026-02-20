// ৮টি বিভাগের জন্য বিশাল ডেটাবেস
const regionalDatabase = {
    "dhaka": {
        "আমি": "আমি", "তুমি": "তুমি", "কেমন": "কেমতে", "খাবো": "খামু", "কেন": "ক্যালা", "কোথায়": "কই", "বলছি": "কইতাছি"
    },
    "ctg": {
        "আমি": "আঁই", "আমার": "আঁত্তে", "তুমি": "তুঁই", "তোমার": "তোঁয়ার", "কেমন": "ক্যান", "আছো": "আছ", "খাবো": "হাইয়্যুম", "কেন": "কিল্লায়"
    },
    "barisal": {
        "আমি": "মুই", "আমার": "মোর", "তুমি": "তুমি", "খাবো": "খামু", "কেন": "ক্যাফে", "কেমন": "কেম্নে", "আছো": "আছোহেন"
    },
    "sylhet": {
        "আমি": "আমি", "তুমি": "তুইন", "কেমন": "কিলা", "আছো": "আছইন", "ভাত": "ভাত", "পানি": "ফানি", "কেন": "কেনে"
    },
    "rajshahi": {
        "আমি": "হামি", "আমার": "হামার", "তুমি": "তুমি", "কেমন": "ক্যামন", "আছো": "আছ্যা", "খাবো": "খাব্যা", "যাবো": "যাব্যা"
    },
    "khulna": {
        "আমি": "আমি", "তুমি": "তিমি", "খাবো": "খাবানে", "যাবো": "যাবানে", "কেন": "কিনে"
    },
    "rangpur": {
        "আমি": "মুই", "আমার": "মোর", "তুমি": "তুঁই", "কেমন": "ক্যাংকরি", "আছো": "আছিস", "খাবো": "খাম", "কোথায়": "কটে"
    },
    "mymensingh": {
        "আমি": "আমি", "খাবো": "খামু", "কেন": "কিয়ের লাইগা", "বলছি": "কইতাছি", "যাবো": "যামুগা"
    }
};

const sourceInput = document.getElementById('sourceInput');
const targetOutput = document.getElementById('targetOutput');
const toRegion = document.getElementById('toRegion');
const charCount = document.getElementById('charCount');

// টাইপ করার সময় অটোমেটিক ট্রান্সলেট
sourceInput.addEventListener('input', () => {
    translateText();
    charCount.innerText = sourceInput.value.length;
});

// বিভাগ পরিবর্তনের সময় অটোমেটিক ট্রান্সলেট
toRegion.addEventListener('change', translateText);

function translateText() {
    let text = sourceInput.value.trim();
    let region = toRegion.value;
    
    if (text === "") {
        targetOutput.value = "";
        return;
    }

    let words = text.split(/\s+/);
    let result = words.map(word => {
        // শব্দটির আঞ্চলিক রূপ খুঁজবে, না পেলে আগের শব্দ রাখবে
        return regionalDatabase[region][word] || word;
    });

    targetOutput.value = result.join(" ");
}

// ভয়েস ফাংশন (গুগল স্টাইল)
function playVoice(elementId) {
    let text = document.getElementById(elementId).value;
    if (!text) return;

    let utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'bn-BD';
    utterance.rate = 0.8; // স্বাভাবিকের চেয়ে একটু ধীর যাতে আঞ্চলিক টান বোঝা যায়
    window.speechSynthesis.speak(utterance);
}

// কপি ফাংশন
function copyResult() {
    targetOutput.select();
    document.execCommand('copy');
    alert("অনুবাদ কপি হয়েছে!");
}
