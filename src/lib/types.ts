export interface Task {
    id: string
    name: string
    description?: string
    estimation: number
    isFinished: boolean
}