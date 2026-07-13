const mapLeaderCard = (leader) => ({

    id: Number(leader.id),

    fullName: leader.full_name,

    slug: leader.slug,

    designation: leader.designation,

    qualification: leader.qualification,

    photo: null,

    level: {

        id: Number(leader.leadership_levels.id),

        name: leader.leadership_levels.name,

        code: leader.leadership_levels.code

    }

});

const mapLeaderDetails = (leader) => ({

    basic: {

        id: Number(leader.id),

        fullName: leader.full_name,

        slug: leader.slug,

        designation: leader.designation,

        qualification: leader.qualification,

        photo: null,

        level: {

            id: Number(leader.leadership_levels.id),

            name: leader.leadership_levels.name,

            code: leader.leadership_levels.code

        }

    },

    experienceSummary: leader.experience_summary,

    description: leader.description,

    contact: {

        email: leader.email,

        phone: leader.phone

    }

});

export {

    mapLeaderCard,

    mapLeaderDetails

};