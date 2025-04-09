
import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "@fontsource/bebas-neue";

const templates = {
  template1: {
    name: "Legendary Yellow",
    background: "/template1.jpg",
    style: "text-black",
  },
  template2: {
    name: "Space Gold",
    background: "/template2.jpg",
    style: "text-black",
  },
  template3: {
    name: "Lingmabolz",
    background: "/template3.jpg",
    style: "text-black",
  },
  template4: {
    name: "Silver Borna",
    background: "/template4.jpg",
    style: "text-black",
  },
};

export default function AuraCardCreator() {
  const [template, setTemplate] = useState("template1");
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    auraType: "",
    skill: "",
    specialPowers: "",
    auraLevel: "",
    description: "",
    farmingPercent: "",
  });
  const cardRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const downloadCard = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, { scale: 3 });
      const link = document.createElement("a");
      link.download = `${formData.name}_auracard.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  const currentTemplate = templates[template];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black text-white font-sans p-4">
      <h1 className="text-4xl font-bold text-center mb-8 font-[Bebas Neue] tracking-wide uppercase">AuraFarm Card Creator</h1>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Panel: Form */}
        <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-lg">
          <label className="block mb-2 font-semibold">Select Card Template:</label>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full p-2 mb-4 text-black rounded"
          >
            {Object.entries(templates).map(([key, temp]) => (
              <option key={key} value={key}>{temp.name}</option>
            ))}
          </select>

          <label className="block mb-2 font-semibold">Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4 w-full" />

          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="mb-3">
              <label className="block text-sm mb-1 capitalize text-white/80">{key.replace(/([A-Z])/g, " $1")}:</label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white/10 border border-white/10 text-white placeholder:text-white/50"
                placeholder={`Enter ${key}`}
              />
            </div>
          ))}

          <button onClick={downloadCard} className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-bold shadow-md">
            Download Aura Card
          </button>
        </div>

        {/* Right Panel: Preview */}
        <div>
          <div
            ref={cardRef}
            className={`relative w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl border-4 border-white ${currentTemplate.style}`}
            style={{ backgroundImage: `url(${currentTemplate.background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 p-4 flex flex-col justify-between text-sm">
              <h2 className="text-3xl font-bold text-center font-[Bebas Neue] uppercase tracking-wide">
                {formData.name}
              </h2>
              {image && (
                <div className="flex justify-center mt-2">
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-3/4 h-48 object-cover rounded border-2 border-white"
                  />
                </div>
              )}
              <div className="space-y-1 mt-4">
                <p><strong>Aura Type:</strong> {formData.auraType}</p>
                <p><strong>Skill:</strong> {formData.skill}</p>
                <p><strong>Special Powers:</strong> {formData.specialPowers}</p>
                <p><strong>Aura Level:</strong> {formData.auraLevel}</p>
                <p><strong>Farming %:</strong> {formData.farmingPercent}</p>
                <p className="italic text-white/70">{formData.description}</p>
              </div>
              <p className="text-xs text-right text-white/50 mt-2">Template: {currentTemplate.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
