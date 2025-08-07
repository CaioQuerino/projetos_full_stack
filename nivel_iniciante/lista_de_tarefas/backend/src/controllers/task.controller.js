import { prisma } from "../lib/prisma.js";
import { schemaTask } from "../models/task.models.js";

export class TaskController {
    async create(req, res) {
        const validateData = schemaTask.parse(req.body)
        const newTask = await prisma.task.create({
            data: {
                ...validateData,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        })

        return res.status(201).json(newTask)
    }

    async read(req, res) {
        return {}
    }

    async readById(req, res) {
        return {}
    }

    async update(req, res) {
        return {}
    }

    async delete(req, res) {
        return {}
    }

}