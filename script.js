// ১. আপনার বড় ডিকশনারি এখানে ডাটাবেজ হিসেবে থাকবে
// স্ট্রাকচার: "শব্দ": ["প্রমিত", "চাটগাঁইয়া", "নোয়াখালী", "বরিশাল", "সিলেট"...]
const masterDict = {
    "আমি": { bangla: "আমি", ctg: "আঁই", noakhali: "আঁই", barisal: "মুই", sylhet: "আমি" },
    "ভাত": { bangla: "ভাত", ctg: "ভাত", noakhali: "ভাত", barisal: "ভাৎ", sylhet: "ভাত" },
    "খাবো": { bangla: "খাবো", ctg: "হাইয়্যুম", noakhali: "হাইয়্যুম", barisal: "খামু", sylhet: "খাইমু" },
    "কেমন": { bangla: "কেমন", ctg: "ক্যান", noakhali: "ক্যান", barisal: "কেম্নে", sylhet: "কিলা" },
    "আছো": { bangla: "আছো", ctg: "আছ", noakhali: "আছ", barisal: "আছোহেন", sylhet: "আছইন" }
};

// ২. অটোমেটিক হাইট বাড়ানো
function autoHeight(elem) {
    elem.style.height = "1px";
    elem.style.height = (elem.scrollHeight) + "px";
    translate();
}

// ৩. ট্রান্সলেশন লজিক (Any to Any)
function translate() {
    const input = document.getElementById("inputText").value.trim();
    const from = document.getElementById("fromLang").value;
    const to = document.getElementById("toLang").value;
    const outputField = document.getElementById("outputText");

    if (!input) {
        outputField.value = "";
        return;
    }

    let words = input.split(/\s+/);
    let result = words.map(word => {
        // প্রথমে ইনপুট শব্দটা কোন বাংলা শব্দের আঞ্চলিক রূপ সেটা খুঁজে বের করা
        let banglaWord = null;
        for (let key in masterDict) {
            if (masterDict[key][from] === word) {
                banglaWord = key;
                break;
            }
        }

        // যদি বাংলা শব্দ পাওয়া যায়, তবে সেটাকে টার্গেট ভাষায় রূপান্তর
        if (banglaWord && masterDict[banglaWord][to]) {
            return masterDict[banglaWord][to];
        }
        return word; // না মিললে আগেরটাই
    });

    outputField.value = result.join(" ");
}

// ৪. ভয়েস বাটন ফিক্সড (এটি ব্রাউজারের বাংলা ভয়েস ব্যবহার করবে)
function playVoice(id) {
    const text = document.getElementById(id).value;
    if (!text) return;
    
    // স্পিচ সিন্থেসিস বন্ধ করে নতুন করে শুরু করা
    window.speechSynthesis.cancel();
    
    const msg = new SpeechSynthesisUtterance();
    msg.text = text;
    msg.lang = 'bn-BD';
    msg.rate = 0.8; 
    window.speechSynthesis.speak(msg);
}

// ৫. কপি ফাংশন
function copy() {
    const text = document.getElementById("outputText");
    text.select();
    document.execCommand("copy");
    alert("কপি হয়েছে ওস্তাদ!");
}
