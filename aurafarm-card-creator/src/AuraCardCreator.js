
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
      const canvas = await html2canvas(cardRef.current);
      const link = document.createElement("a");
      link.download = `${formData.name}_auracard.png`;
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const currentTemplate = templates[template];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center">AuraFarm Card Creator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="block mb-2 font-semibold">Select Template:</label>
          <select
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          >
            {Object.entries(templates).map(([key, temp]) => (
              <option key={key} value={key}>{temp.name}</option>
            ))}
          </select>

          <label className="block mb-2 font-semibold">Upload Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-4" />

          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="mb-3">
              <label className="block font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}:</label>
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}

          <button onClick={downloadCard} className="mt-4 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">
            Download Aura Card
          </button>
        </div>

        <div>
          <div
            ref={cardRef}
            className={`relative w-full aspect-[3/4] border-4 rounded-lg overflow-hidden shadow-xl bg-cover bg-center ${currentTemplate.style}`}
            style={{ backgroundImage: `url(${currentTemplate.background})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-10 p-4 flex flex-col justify-between">
              <h2 className="text-3xl font-bold text-center font-[Bebas Neue] uppercase tracking-wide">
                {formData.name}
              </h2>
              {image && (
                <div className="flex justify-center">
                  <img
                    src={image}
                    alt="Uploaded"
                    className="w-3/4 h-48 object-cover rounded border-2 border-white"
                  />
                </div>
              )}
              <div className="text-sm space-y-1 mt-2">
                <p><strong>Aura Type:</strong> {formData.auraType}</p>
                <p><strong>Skill:</strong> {formData.skill}</p>
                <p><strong>Special Powers:</strong> {formData.specialPowers}</p>
                <p><strong>Aura Level:</strong> {formData.auraLevel}</p>
                <p><strong>Farming %:</strong> {formData.farmingPercent}</p>
                <p className="italic">{formData.description}</p>
              </div>
              <p className="text-xs text-right text-gray-300">Template: {currentTemplate.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
