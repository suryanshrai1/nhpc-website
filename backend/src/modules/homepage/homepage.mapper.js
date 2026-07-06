import { resolveContent } from "./utils/contentResolver.js";

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

        const resolvedContent = resolveContent(
            section.homepage_content
        );

        const content = removeSectionPrefix(
            section.section_key,
            resolvedContent
        );

        const title = content.title ?? section.title;
        const subtitle = content.subtitle ?? section.subtitle;

        delete content.title;
        delete content.subtitle;

        const mappedSection = {

            id: Number(section.id),

            title,

            subtitle,

            displayOrder: section.display_order,

            isVisible: section.is_visible,

            content

        };

        if (section.hero_buttons.length > 0) {

            mappedSection.buttons = section.hero_buttons.map(button => ({

                id: Number(button.id),

                label: button.label,

                url: button.url,

                style: button.button_style,

                displayOrder: button.display_order

            }));

        }

        mappedSections[section.section_key] = mappedSection;

    });

    return mappedSections;

};

export const mapHomepageData = (data) => {

    const sections = mapSections(data.sections);

    // Attach dynamic data to corresponding section

    if (sections.statistics) {

        sections.statistics.items = data.statistics.map(item => ({

            id: Number(item.id),

            label: item.label,

            value: item.value,

            icon: item.icon

        }));

    }

    if (sections.featured_projects) {

        sections.featured_projects.items = data.featuredProjects.map(project => ({

            id: Number(project.id),

            name: project.name,

            slug: project.slug,

            summary: project.summary,

            capacity: Number(project.capacity),

            state: project.states.name,

            type: project.project_types.name

        }));

    }

    if (sections.latest_news) {

        sections.latest_news.items = data.latestNews.map(news => ({

            id: Number(news.id),

            title: news.title,

            slug: news.slug,

            summary: news.summary,

            publishedAt: news.published_at,

            category: news.news_categories.name

        }));

    }

    if (sections.sustainability) {

        sections.sustainability.items = data.sustainability.map(item => ({

            id: Number(item.id),

            title: item.title,

            slug: item.slug,

            summary: item.summary,

            publishedAt: item.published_at,

            type: item.sustainability_types.name

        }));

    }

    if (sections.investor_highlights) {

        sections.investor_highlights.items = data.investorHighlights.map(item => ({

            id: Number(item.id),

            metric: item.metric_name,

            value: item.metric_value,

            unit: item.unit,

            financialYear: item.financial_years.label

        }));

    }

    if (sections.operational_stations) {

        sections.operational_stations.items = data.operationalStations.map(station => ({

            id: Number(station.id),

            name: station.name,

            slug: station.slug,

            installedCapacity: Number(station.installed_capacity),

            state: station.states.name,

            type: station.project_types.name

        }));

    }

    return sections;

};