"use client";
import React from "react";
import Header from "../dashboard/_components/Header";
import { motion } from "framer-motion";

const subjects = [
    {
      name: "Computer Networks",
      links: [
        { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/computer-network-tutorials/" },
        { label: "Javatpoint", url: "https://www.javatpoint.com/computer-network-tutorial" },
        { label: "Neso Academy (YouTube)", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRj0cPZLkzN0Jz00HMuYl0VN" },
      ],
    },
    {
      name: "Operating System",
      links: [
        { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/operating-systems/" },
        { label: "Neso Academy (YouTube)", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRjoG6aJ4FvFU1tlXbjLBiOP" },
        { label: "Javatpoint", url: "https://www.javatpoint.com/operating-system" },
      ],
    },
    {
      name: "DBMS",
      links: [
        { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/dbms/" },
        { label: "Neso Academy (YouTube)", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRjnhlhy7V7OaP18xWnJrQUg" },
        { label: "TutorialsPoint", url: "https://www.tutorialspoint.com/dbms/index.htm" },
      ],
    },
    {
      name: "Data Structures",
      links: [
        { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/data-structures/" },
        { label: "Programiz", url: "https://www.programiz.com/dsa" },
        { label: "Kunal Kushwaha (YouTube)", url: "https://www.youtube.com/playlist?list=PLDzeHZWIZsTryvtXdMr6rPh4IDexB5NIA" },
      ],
    },
    {
      name: "Algorithms",
      links: [
        { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/fundamentals-of-algorithms/" },
        { label: "Khan Academy", url: "https://www.khanacademy.org/computing/computer-science/algorithms" },
        { label: "Coursera", url: "https://www.coursera.org/specializations/algorithms" },
      ],
    },
    {
      name: "C Programming",
      links: [
        { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/c-programming-language/" },
        { label: "Programiz", url: "https://www.programiz.com/c-programming" },
        { label: "TutorialsPoint", url: "https://www.tutorialspoint.com/cprogramming/index.htm" },
      ],
    },
    {
      name: "Java",
      links: [
        { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/java/" },
        { label: "JavaTpoint", url: "https://www.javatpoint.com/java-tutorial" },
        { label: "Oracle Docs", url: "https://docs.oracle.com/javase/tutorial/" },
      ],
    },
    {
      name: "Python",
      links: [
        { label: "Python Docs", url: "https://docs.python.org/3/tutorial/" },
        { label: "W3Schools", url: "https://www.w3schools.com/python/" },
        { label: "Programiz", url: "https://www.programiz.com/python-programming" },
      ],
    },
    {
      name: "SQL",
      links: [
        { label: "W3Schools", url: "https://www.w3schools.com/sql/" },
        { label: "LeetCode SQL", url: "https://leetcode.com/problemset/database/" },
        { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/sql-tutorial/" },
      ],
    },
    {
      name: "Web Development",
      links: [
        { label: "freeCodeCamp", url: "https://www.freecodecamp.org/learn/" },
        { label: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/docs/Learn" },
        { label: "W3Schools", url: "https://www.w3schools.com/whatis/" },
      ],
    },
    {
      name: "HTML",
      links: [
        { label: "MDN Docs", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
        { label: "W3Schools", url: "https://www.w3schools.com/html/" },
        { label: "freeCodeCamp", url: "https://www.freecodecamp.org/learn/responsive-web-design/basic-html-and-html5/" },
      ],
    },
    {
      name: "CSS",
      links: [
        { label: "MDN Docs", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
        { label: "W3Schools", url: "https://www.w3schools.com/css/" },
        { label: "freeCodeCamp", url: "https://www.freecodecamp.org/learn/responsive-web-design/basic-css/" },
      ],
    },
    {
      name: "JavaScript",
      links: [
        { label: "JavaScript.info", url: "https://javascript.info/" },
        { label: "W3Schools", url: "https://www.w3schools.com/js/" },
        { label: "MDN", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      ],
    },
    {
      name: "React",
      links: [
        { label: "React Official Docs", url: "https://reactjs.org/docs/getting-started.html" },
        { label: "freeCodeCamp", url: "https://www.freecodecamp.org/news/tag/react/" },
        { label: "Scrimba React Course", url: "https://scrimba.com/learn/learnreact" },
      ],
    },
    {
      name: "Node.js",
      links: [
        { label: "Node.js Docs", url: "https://nodejs.org/en/docs" },
        { label: "W3Schools", url: "https://www.w3schools.com/nodejs/" },
        { label: "freeCodeCamp", url: "https://www.freecodecamp.org/learn/back-end-development-and-apis/" },
      ],
    },
    {
      name: "MongoDB",
      links: [
        { label: "MongoDB University", url: "https://university.mongodb.com/" },
        { label: "W3Schools", url: "https://www.w3schools.com/mongodb/" },
        { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/introduction-to-mongodb/" },
      ],
    },
    {
      name: "Machine Learning",
      links: [
        { label: "Andrew Ng - Coursera", url: "https://www.coursera.org/learn/machine-learning" },
        { label: "Google ML Crash Course", url: "https://developers.google.com/machine-learning/crash-course" },
        { label: "Kaggle Learn", url: "https://www.kaggle.com/learn/intro-to-machine-learning" },
      ],
    },
    {
      name: "Data Science",
      links: [
        { label: "IBM Data Science Course", url: "https://www.coursera.org/professional-certificates/ibm-data-science" },
        { label: "Kaggle", url: "https://www.kaggle.com/learn" },
        { label: "HarvardX", url: "https://online-learning.harvard.edu/series/data-science" },
      ],
    },
    {
      name: "Cyber Security",
      links: [
        { label: "Cybrary", url: "https://www.cybrary.it/" },
        { label: "TryHackMe", url: "https://tryhackme.com/" },
        { label: "Coursera", url: "https://www.coursera.org/browse/information-technology/cybersecurity" },
      ],
    },
    {
      name: "Cloud Computing",
      links: [
        { label: "AWS Training", url: "https://aws.amazon.com/training/" },
        { label: "Microsoft Learn", url: "https://learn.microsoft.com/en-us/training/azure/" },
        { label: "Coursera - Cloud Fundamentals", url: "https://www.coursera.org/learn/cloud-computing" },
      ],
    },
    {
      name: "Computer Architecture",
      links: [
        { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/basic-computer-engineering-computer-organization/" },
        { label: "Neso Academy", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRgLLlzdgiTUKULKYZ1u2RHL" },
        { label: "TutorialsPoint", url: "https://www.tutorialspoint.com/computer_logical_organization/index.htm" },
      ],
    },
    {
      name: "Compiler Design",
      links: [
        { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/compiler-design-tutorials/" },
        { label: "Neso Academy", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRjjg8BpgpaQIJwK3ezW2t1x" },
        { label: "Javatpoint", url: "https://www.javatpoint.com/compiler-design" },
      ],
    },
    {
      name: "Discrete Mathematics",
      links: [
        { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/discrete-mathematics/" },
        { label: "TutorialsPoint", url: "https://www.tutorialspoint.com/discrete_mathematics/index.htm" },
        { label: "Coursera", url: "https://www.coursera.org/learn/discrete-mathematics" },
      ],
    },
    {
      name: "Software Engineering",
      links: [
        { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/software-engineering/" },
        { label: "Javatpoint", url: "https://www.javatpoint.com/software-engineering" },
        { label: "NPTEL", url: "https://nptel.ac.in/courses/106105182" },
      ],
    },
    {
      name: "OOPs",
      links: [
        { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/object-oriented-programming-in-cpp/" },
        { label: "W3Schools", url: "https://www.w3schools.com/cpp/cpp_oop.asp" },
        { label: "Neso Academy (YouTube)", url: "https://www.youtube.com/watch?v=lbXsrHGhBAU" },
      ],
    },
    {
      name: "Computer Graphics",
      links: [
        { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/computer-graphics/" },
        { label: "TutorialsPoint", url: "https://www.tutorialspoint.com/computer_graphics/index.htm" },
        { label: "Javatpoint", url: "https://www.javatpoint.com/computer-graphics" },
      ],
    },
    {
      name: "Digital Logic Design",
      links: [
        { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/digital-electronics-logic-design-tutorials/" },
        { label: "Neso Academy", url: "https://www.youtube.com/playlist?list=PLBlnK6fEyqRjvCyiZp8so1pXVJp6j3kSa" },
        { label: "TutorialsPoint", url: "https://www.tutorialspoint.com/digital_circuits/index.htm" },
      ],
    },
    {
      name: "Artificial Intelligence",
      links: [
        { label: "GeeksforGeeks", url: "https://www.geeksforgeeks.org/artificial-intelligence/" },
        { label: "Coursera", url: "https://www.coursera.org/browse/data-science/ai" },
        { label: "YouTube - Codebasics", url: "https://www.youtube.com/playlist?list=PLeo1K3hjS3uu_n_a__MI_KktGTLYopZ12" },
      ],
    },
    {
      name: "Cloud DevOps",
      links: [
        { label: "Udacity Nanodegree", url: "https://www.udacity.com/course/cloud-dev-ops-nanodegree--nd9991" },
        { label: "AWS DevOps", url: "https://aws.amazon.com/devops/what-is-devops/" },
        { label: "Microsoft Learn DevOps", url: "https://learn.microsoft.com/en-us/devops/" },
      ],
    }
  ];
  

const SubjectResources = () => {
  return (
    <div>
    <Header />
    <div className="min-h-screen bg-black py-16 px-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-12 animate-pulse leading-tight">
  Subject Preparation Resources
</h1>


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {subjects.map((subject, index) => (
          <div
            key={index}
            className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-purple-700 hover:scale-105 transition-all duration-300 ease-in-out transform"
          >
            <h2 className="text-lg font-semibold text-center text-white mb-4">
              {subject.name}
            </h2>
            <ul className="space-y-2 text-sm text-purple-300 text-center">
              {subject.links.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-400 hover:underline transition-all"
                  >
                    🔗 {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);
  
};

export default SubjectResources;
