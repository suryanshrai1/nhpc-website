import prisma from "../../../config/prisma.js";

class StationAdminRepository {
    async getStations({ page, limit }) {
        const offset = (page - 1) * limit;
        const [items, total] = await Promise.all([
            prisma.operational_power_stations.findMany({
                include: {
                    states: true,
                    project_types: true,
                    capacity_units: true
                },
                orderBy: { display_order: "asc" },
                take: limit,
                skip: offset
            }),
            prisma.operational_power_stations.count()
        ]);
        return { items, total };
    }

    async getStationById(id) {
        return prisma.operational_power_stations.findUnique({
            where: { id: BigInt(id) },
            include: {
                states: true,
                project_types: true,
                capacity_units: true
            }
        });
    }

    async getStationBySlug(slug) {
        return prisma.operational_power_stations.findUnique({
            where: { slug }
        });
    }

    async createStation(data) {
        return prisma.operational_power_stations.create({
            data: {
                name: data.name,
                slug: data.slug,
                state_id: BigInt(data.state_id),
                project_type_id: BigInt(data.project_type_id),
                installed_capacity: data.installed_capacity,
                capacity_unit_id: BigInt(data.capacity_unit_id),
                commissioned_on: data.commissioned_on ? new Date(data.commissioned_on) : null,
                latitude: data.latitude || null,
                longitude: data.longitude || null,
                description: data.description || null,
                is_featured: data.is_featured,
                display_order: data.display_order,
                is_active: data.is_active
            }
        });
    }

    async updateStation(id, data) {
        return prisma.operational_power_stations.update({
            where: { id: BigInt(id) },
            data: {
                name: data.name,
                slug: data.slug,
                state_id: BigInt(data.state_id),
                project_type_id: BigInt(data.project_type_id),
                installed_capacity: data.installed_capacity,
                capacity_unit_id: BigInt(data.capacity_unit_id),
                commissioned_on: data.commissioned_on ? new Date(data.commissioned_on) : null,
                latitude: data.latitude || null,
                longitude: data.longitude || null,
                description: data.description || null,
                is_featured: data.is_featured,
                display_order: data.display_order,
                is_active: data.is_active,
                updated_at: new Date()
            }
        });
    }

    async updateStatus(id, is_active) {
        return prisma.operational_power_stations.update({
            where: { id: BigInt(id) },
            data: {
                is_active,
                updated_at: new Date()
            }
        });
    }

    async deleteStation(id) {
        return prisma.operational_power_stations.delete({
            where: { id: BigInt(id) }
        });
    }
}

export default new StationAdminRepository();
