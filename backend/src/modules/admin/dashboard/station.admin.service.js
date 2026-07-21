import stationAdminRepository from "./station.admin.repository.js";
import ApiError from "../../../errors/ApiError.js";
import HTTP_STATUS from "../../../constants/httpStatus.js";

class StationAdminService {
    async getStations({ page, limit }) {
        const { items, total } = await stationAdminRepository.getStations({ page, limit });
        return {
            items: items.map(item => ({
                id: Number(item.id),
                name: item.name,
                slug: item.slug,
                installed_capacity: Number(item.installed_capacity),
                commissioned_on: item.commissioned_on,
                latitude: item.latitude ? Number(item.latitude) : null,
                longitude: item.longitude ? Number(item.longitude) : null,
                description: item.description,
                is_featured: item.is_featured,
                is_active: item.is_active,
                display_order: item.display_order,
                state: {
                    id: Number(item.states.id),
                    name: item.states.name
                },
                projectType: {
                    id: Number(item.project_types.id),
                    name: item.project_types.name
                },
                capacityUnit: {
                    id: Number(item.capacity_units.id),
                    name: item.capacity_units.name,
                    code: item.capacity_units.code
                }
            })),
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    }

    async getStationById(id) {
        const item = await stationAdminRepository.getStationById(id);
        if (!item) return null;
        return {
            id: Number(item.id),
            name: item.name,
            slug: item.slug,
            installed_capacity: Number(item.installed_capacity),
            commissioned_on: item.commissioned_on,
            latitude: item.latitude ? Number(item.latitude) : null,
            longitude: item.longitude ? Number(item.longitude) : null,
            description: item.description,
            is_featured: item.is_featured,
            is_active: item.is_active,
            display_order: item.display_order,
            state_id: Number(item.states.id),
            project_type_id: Number(item.project_types.id),
            capacity_unit_id: Number(item.capacity_units.id)
        };
    }

    async createStation(data) {
        const existing = await stationAdminRepository.getStationBySlug(data.slug);
        if (existing) {
            throw new ApiError(HTTP_STATUS.CONFLICT, "A station with this slug already exists.");
        }
        return stationAdminRepository.createStation(data);
    }

    async updateStation(id, data) {
        const existing = await stationAdminRepository.getStationById(id);
        if (!existing) {
            throw new ApiError(HTTP_STATUS.NOT_FOUND, "Station not found.");
        }
        if (existing.slug !== data.slug) {
            const slugExists = await stationAdminRepository.getStationBySlug(data.slug);
            if (slugExists) {
                throw new ApiError(HTTP_STATUS.CONFLICT, "A station with this slug already exists.");
            }
        }
        return stationAdminRepository.updateStation(id, data);
    }

    async updateStatus(id, is_active) {
        return stationAdminRepository.updateStatus(id, is_active);
    }

    async deleteStation(id) {
        return stationAdminRepository.deleteStation(id);
    }
}

export default new StationAdminService();
