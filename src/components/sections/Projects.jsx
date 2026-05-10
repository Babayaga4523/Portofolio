'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { projects, featuredProject } from '../../lib/data/projects';
import SectionTag from '../ui/SectionTag';
import SectionHeading from '../ui/SectionHeading';
import ProjectCard from '../ui/ProjectCard';
import GoldButton from '../ui/GoldButton';

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const otherProjects = projects.filter((p) => p.id !== featuredProject.id);
  const visibleProjects = showAll ? otherProjects : otherProjects.slice(0, 6);

  return (
    <section id="projects" className="py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <SectionTag>Portfolio</SectionTag>
            <SectionHeading className="mt-4">
              Featured <span className="text-gold italic">Projects</span>
            </SectionHeading>
            <p className="text-text-muted mt-4 max-w-lg">
              A curated selection of work spanning web applications, AI systems, and creative technology.
            </p>
          </div>

          <a
            href="https://github.com/Babayaga4523"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-cream rounded-full text-sm font-medium text-navy border border-border-light hover:border-navy hover:bg-navy hover:text-white transition-all"
          >
            <Github className="w-4 h-4" />
            View GitHub
          </a>
        </div>

        {/* Featured Project */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-cream rounded-3xl overflow-hidden mb-12 border border-border-light"
        >
          <div className="grid lg:grid-cols-[55fr_45fr]">
            {/* Project Image */}
            <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-cream-alt">
              <img
                src={featuredProject.images[0]}
                alt={featuredProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-gold text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                Featured
              </div>
            </div>

            {/* Project Info */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <span className="text-xs font-semibold text-gold uppercase tracking-wider mb-2">
                Web Development
              </span>
              <h3 className="font-playfair text-2xl md:text-3xl font-semibold text-navy mb-4">
                {featuredProject.title}
              </h3>
              <p className="text-text-muted leading-relaxed mb-6">
                {featuredProject.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-white rounded-full text-sm text-text-muted border border-border-light"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {featuredProject.link && (
                  <GoldButton
                    size="sm"
                    href={featuredProject.link}
                    icon={<ExternalLink className="w-4 h-4" />}
                  >
                    Visit Live
                  </GoldButton>
                )}
                <GoldButton
                  size="sm"
                  variant="outline"
                  href="https://github.com/Babayaga4523"
                  icon={<Github className="w-4 h-4" />}
                >
                  View Code
                </GoldButton>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View More / View Less */}
        {otherProjects.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <GoldButton
              variant="outline"
              size="lg"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? 'Show Less' : `View All ${otherProjects.length} Projects`}
              <ArrowUpRight className={`w-5 h-5 transition-transform ${showAll ? 'rotate-180' : ''}`} />
            </GoldButton>

            <a
              href="https://github.com/Babayaga4523"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-full text-base font-medium hover:bg-navy-mid transition-colors"
            >
              <Github className="w-5 h-5" />
              More on GitHub
            </a>
          </motion.div>
        )}

        {/* Always show GitHub link if all visible */}
        {otherProjects.length <= 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a
              href="https://github.com/Babayaga4523"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-navy text-white rounded-full text-lg font-medium hover:bg-navy-mid transition-colors"
            >
              <Github className="w-5 h-5" />
              See More on GitHub
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
