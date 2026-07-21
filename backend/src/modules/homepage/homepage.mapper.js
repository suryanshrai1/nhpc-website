import { resolveContent } from "./utils/contentResolver.js";

const toCamelCase = (str) =>
    str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());

const removeSectionPrefix = (sectionKey, content = {}) => {
    const prefix = `${sectionKey}_`;
    const cleanedContent = {};

    Object.entries(content).forEach(([key, value]) => {
        if (key.startsWith(prefix)) {
            cleanedContent[key.slice(prefix.length)] = value;
        } else {
            cleanedContent[key] = value;
        }
    });

    return cleanedContent;
};

const mapSections = (sections = []) => {
    const mappedSections = {};

    sections.forEach((section) => {
        const resolvedContent = resolveContent(section.homepage_content);

        const content = removeSectionPrefix(
            section.section_key,
            resolvedContent
        );

        const title = content.title ?? section.title;
        const subtitle = content.subtitle ?? section.subtitle;

        delete content.title;
        delete content.subtitle;

        // Normalize media fields
        if ("image" in content) {
            content.heroImage = content.image;
            delete content.image;
        }

        if ("video" in content) {
            content.heroVideo = content.video;
            delete content.video;
        }

        const mappedSection = {
            id: Number(section.id),
            title,
            subtitle,
            displayOrder: section.display_order,
            isVisible: section.is_visible,
            ...content,
        };

        if (section.hero_buttons.length > 0) {
            mappedSection.buttons = section.hero_buttons
                .sort((a, b) => a.display_order - b.display_order)
                .map((button) => ({
                    id: Number(button.id),
                    label: button.label,
                    url: button.url,
                    variant: button.button_style.toLowerCase(),
                    displayOrder: button.display_order,
                }));
        }

        mappedSections[toCamelCase(section.section_key)] = mappedSection;
    });

    return mappedSections;
};

export const mapHomepageData = (data) => {
    const sections = mapSections(data.sections);

    if (sections.statistics) {
        sections.statistics.items = data.statistics.map((item) => ({
            id: Number(item.id),
            label: item.label,
            value: item.value,
            icon: item.icon,
        }));
    }

    if (sections.featuredProjects) {
        sections.featuredProjects.items = data.featuredProjects.map((project) => ({
            id: Number(project.id),
            name: project.name,
            slug: project.slug,
            summary: project.summary,
            capacity: Number(project.capacity),
            state: project.states.name,
            type: project.project_types.name,
        }));
    }

    if (sections.latestNews) {
        sections.latestNews.items = data.latestNews.map((news) => ({
            id: Number(news.id),
            title: news.title,
            slug: news.slug,
            summary: news.summary,
            publishedAt: news.published_at,
            category: news.news_categories.name,
        }));
    }

    if (sections.sustainability) {
        sections.sustainability.items = data.sustainability.map((item) => ({
            id: Number(item.id),
            title: item.title,
            slug: item.slug,
            summary: item.summary,
            publishedAt: item.published_at,
            type: item.sustainability_types.name,
        }));
    }

    if (sections.investorHighlights) {
        sections.investorHighlights.items = data.investorHighlights.map((item) => ({
            id: Number(item.id),
            metric: item.metric_name,
            value: item.metric_value,
            unit: item.unit,
            financialYear: item.financial_years.label,
        }));
    }
    
    if (sections.operationalStations) {
        sections.operationalStations.items = data.operationalStations.map((station) => ({
            id: Number(station.id),
            name: station.name,
            slug: station.slug,

            installedCapacity: Number(station.installed_capacity),

            latitude: station.latitude
                ? Number(station.latitude)
                : null,

            longitude: station.longitude
                ? Number(station.longitude)
                : null,

            state: {
                id: Number(station.states.id),
                name: station.states.name,
                code: station.states.code,
            },

            projectType: {
                id: Number(station.project_types.id),
                name: station.project_types.name,
            },
        }));
    }

    return sections;
};