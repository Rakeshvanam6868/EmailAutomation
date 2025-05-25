export const getDefaultEmailContent = (recruiter, user) => `
<p>Dear ${recruiter.name},</p>
<p>I hope you're doing well! My name is <strong>Rakesh Vanam</strong>, a Full Stack Developer skilled in 
<strong>React.js</strong>, <strong>Next.js</strong>, <strong>Node.js</strong>, and <strong>PostgreSQL</strong>. 
I specialize in creating seamless and scalable web applications, and I'm excited to explore opportunities with 
<strong>${recruiter.company}</strong>.</p>
<p>I'm currently a Full Stack Developer Intern at <strong>5th Dimension Technologies</strong>, where I work on building scalable applications and enhancing user experiences. Some of my recent personal projects include:</p>
<ul>
  <li><strong>SPIRON.AI</strong>: A cutting-edge AI-powered web app built with <strong>React</strong> and <strong>Next.js</strong></li>
  <li><strong>FASTGRID</strong>: An interactive game designed to improve cognitive skills, built using <strong>React</strong> and <strong>Vite</strong></li>
</ul>
<p>I'm eager to contribute to <strong>${recruiter.company}</strong> with my skills and passion for building high-performance applications. Please find my resume linked below:</p>
<p><strong>📄 <a href="${user.resumeLink}">View Resume</a></strong></p>
<p>Looking forward to hearing from you!</p>
<p>Best regards,<br/>
<strong>Rakesh Vanam</strong><br/>
Full Stack Developer<br/>
📞 +91 9392865593 | 📧 <a href="mailto:rakeshvanam2002@gmail.com">rakeshvanam2002@gmail.com</a><br/>
🔗 <a href="https://www.linkedin.com/in/rakeshvanam1/ ">LinkedIn</a> | 
<a href="https://github.com/rakeshvanam6868 ">GitHub</a></p>
`;