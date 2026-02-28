export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image: string;
  date: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description: string;
}

export interface Skill {
  name: string;
  category: 'Frontend' | 'Backend' | 'Tools' | 'Other';
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'IMDB Clone',
    date: 'March 2025',
    description: 'Designed and implemented a IMDB Clone using HTML, CSS, JavaScript and Tailwind CSS. Uses OMDB API to fetch movie details and allows users to search and save to favorites.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'OMDB API'],
    image: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Fvishaal98.github.io%2FIMDBClone%2F?w=800&h=600',
    link: 'https://vishaal98.github.io/IMDBClone/'
  },
  {
    id: '2',
    title: 'BuyBusy E-Commerce App',
    date: 'January 2025',
    description: 'A React-based e-commerce platform with Firebase integration for CRUD operations on cart items. Features a well-organized folder structure for scalability.',
    tags: ['React.js', 'Firebase', 'JavaScript', 'Tailwind CSS'],
    image: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Ftangerine-gingersnap-3c8b63.netlify.app%2F?w=800&h=600',
    link: 'https://tangerine-gingersnap-3c8b63.netlify.app/'
  },
  {
    id: '3',
    title: 'Music Player App',
    date: 'December 2024',
    description: 'A robust music player system to manage songs with functionalities like play, pause, update, and search. Includes a dark/light mode toggle.',
    tags: ['HTML', 'CSS', 'JavaScript', 'API Integration'],
    image: 'https://files.codingninjas.in/music-player-29857.gif',
    link: 'https://unrivaled-croissant-a85fe9.netlify.app/'
  },
  {
    id: '4',
    title: 'Stock Market Analysis',
    date: 'November 2024',
    description: 'A web application that displays available stocks in a portfolio and their data over different time ranges using fetch API and dynamic charts.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Fetch API'],
    image: 'https://s.wordpress.com/mshots/v1/https%3A%2F%2Funrivaled-croissant-a85fe9.netlify.app%2F?w=800&h=600',
    link: 'https://unrivaled-croissant-a85fe9.netlify.app/'
  }
];

export const EDUCATION: Education[] = [
  {
    id: '1',
    institution: 'Sardar Patel University',
    degree: 'B.S.c (Computer Application & Information Technology)',
    period: '2021 — 2024',
    description: 'Graduated with a CGPA of 8.28. Focused on core computer science concepts and information technology.',
  },
  {
    id: '2',
    institution: 'Coding Ninjas',
    degree: 'Full Stack Web Development Training',
    period: 'Aug 2024 — May 2025',
    description: 'Comprehensive training covering Front-End, Back-End, Data Structures & Algorithms, and Python.',
  }
];

export const SKILLS: Skill[] = [
  { name: 'React.js', category: 'Frontend' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'HTML/CSS', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Bootstrap', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'MongoDB', category: 'Backend' },
  { name: 'Firebase', category: 'Backend' },
  { name: 'MySQL', category: 'Backend' },
  { name: 'VS Code', category: 'Tools' },
  { name: 'Postman', category: 'Tools' },
  { name: 'GitHub', category: 'Tools' },
  { name: 'DSA', category: 'Other' },
  { name: 'OOPS', category: 'Other' },
];
