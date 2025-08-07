import z from "zod";
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
        const tasks = await prisma.task.findMany()
        return res.status(200).json(tasks)
    }

    async readById(req, res) {
        try {
            const id = taskIdSchema.parse(Number(req.params.id));

            const task = await prisma.task.findUnique({
                where: { id },
                select: {
                    id: true,
                    title: true,
                    task: true,
                    completed: true,
                    createdAt: true,
                    updatedAt: true
                }
            });

            if (!task) {
                return res.status(404).json({
                    success: false,
                    error: "Task not found"
                });
            }

            return res.status(200).json({
                success: true,
                data: task
            });

        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    success: false,
                    error: "Invalid ID format",
                    details: error.errors
                });
            }

            console.error('Read Task Error:', error);
            return res.status(500).json({
                success: false,
                error: "Failed to fetch task",
            });
        }
    }

    async update(req, res) {
        try {
            const id = taskIdSchema.parse(Number(req.params.id));
            const validatedData = schemaTask.partial().parse(req.body);

            const updatedTask = await prisma.task.update({
                where: { id },
                data: validatedData,
                select: {
                    id: true,
                    title: true,
                    task: true,
                    completed: true,
                    createdAt: true,
                    updatedAt: true
                }
            });

            return res.status(200).json({
                success: true,
                data: updatedTask
            });

        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    success: false,
                    error: "Validation error",
                    details: error.errors
                });
            }

            if (error.code === 'P2025') {
                return res.status(404).json({
                    success: false,
                    error: "Task not found"
                });
            }

            console.error('Update Task Error:', error);
            return res.status(500).json({
                success: false,
                error: "Failed to update task",
            });
        }
    }

    async delete(req, res) {
        try {
            const id = taskIdSchema.parse(Number(req.params.id));

            await prisma.task.delete({
                where: { id }
            });

            return res.status(204).end();

        } catch (error) {
            if (error instanceof z.ZodError) {
                return res.status(400).json({
                    success: false,
                    error: "Invalid ID format",
                    details: error.errors
                });
            }

            if (error.code === 'P2025') {
                return res.status(404).json({
                    success: false,
                    error: "Task not found"
                });
            }
        }
    }

}