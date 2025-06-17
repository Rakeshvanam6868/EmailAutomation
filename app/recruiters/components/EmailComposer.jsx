'use client';
import axios from 'axios';
import { useState } from 'react';

export default function EmailComposer({ recruiter, onClose }) {
  const [subject, setSubject] = useState(`Frontend Developer Application - ${recruiter?.company}`);
  const [body, setBody] = useState(`
<p>Dear ${recruiter?.name},</p>
<p>I hope you're doing well! My name is Rakesh Vanam, a Full Stack Developer skilled in React.js, Next.js, Node.js, and PostgreSQL. I specialize in creating seamless and scalable web applications, and I'm excited to explore opportunities with ${recruiter?.company}.</p>
<p>Please find my resume linked below:</p>
<p><strong>📄 <a href="[YOUR_RESUME_LINK]">View Resume</a></strong></p>
<p>Looking forward to hearing from you!</p>
<p>Best regards,<br/>
Rakesh Vanam<br/>
📞 +91 9392865593 | 📧 rakeshvanam2002@gmail.com<br/>
🔗 <a href="https://www.linkedin.com/in/rakeshvanam1/">LinkedIn</a>  | 
<a href="https://github.com/rakeshvanam6868">GitHub</a></p> 
`);

  const sendEmail = async () => {
    if (!recruiter?.id) {
      alert('Invalid recruiter data');
      return;
    }

    try {
      await axios.post('/api/recruiters/customizeEmail', {
        recruiterId: recruiter.id,
        subject,
        body,
      });

      alert('Custom email saved successfully!');
      onClose();
    } catch (error) {
      console.error('Error saving custom email:', error);
      alert('Failed to customize email. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <h3 className="text-xl font-semibold mb-4">Compose Email</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">To</label>
          <input
            type="text"
            readOnly
            value={recruiter.email || ''}
            className="w-full border-gray-300 rounded-md p-2 bg-gray-100"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Message Body</label>
          <textarea
            rows={10}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full border-gray-300 rounded-md p-2"
          ></textarea>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={sendEmail}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Custom Email
          </button>
        </div>
      </div>
    </div>
  );
}