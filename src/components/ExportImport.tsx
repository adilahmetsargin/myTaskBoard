import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAll } from "../features/tasks/tasksSlice";
import { RootState, AppDispatch } from "../app/store";
import { FiDownload, FiUpload } from "react-icons/fi";

const ExportImport: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.tasks);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = {
      tasks: items,
      exportDate: new Date().toISOString(),
      version: "1.0"
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `focusflow-tasks-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.tasks && Array.isArray(data.tasks)) {
          dispatch(setAll(data.tasks));
          alert(`Successfully imported ${data.tasks.length} tasks!`);
        } else {
          alert('Invalid file format. Please select a valid FocusFlow export file.');
        }
      } catch (error) {
        alert('Error reading file. Please make sure it\'s a valid JSON file.');
      }
    };
    reader.readAsText(file);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="export-import">
      <button 
        className="export-btn"
        onClick={handleExport}
        disabled={items.length === 0}
        title="Export all tasks to JSON file"
      >
        <FiDownload size={16} />
        Export
      </button>
      
      <label className="import-btn" title="Import tasks from JSON file">
        <FiUpload size={16} />
        Import
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );
};

export default ExportImport;
