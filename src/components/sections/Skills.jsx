'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { skillCategories } from '../../lib/data/skills';
import SectionTag from '../ui/SectionTag';
import SectionHeading from '../ui/SectionHeading';
import SkillCard from '../ui/SkillCard';

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].id);

  const currentCategory = skillCategories.find((cat) => cat.id === activeTab);

  return (
    <section id="skills" className="py-24 md:py-32 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <SectionTag>Expertise</SectionTag>
          <SectionHeading className="mt-4">
            Technical <span className="text-gold italic">Proficiency</span>
          </SectionHeading>
          <p className="text-text-muted mt-4 max-w-lg mx-auto">
            A comprehensive toolkit for building scalable applications and intelligent systems.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`
                px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
                ${activeTab === category.id
                  ? 'bg-gold text-white shadow-md'
                  : 'bg-white text-text-muted hover:text-navy border border-border-light'
                }
              `}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {currentCategory?.skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}