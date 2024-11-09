import { Component, OnInit } from '@angular/core';

interface Task {
  id: number;
  content: string;
  completed: boolean;
}

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  tasks: Task[] = []; // Lista de tarefas
  taskContent: string = ''; // Conteúdo da tarefa no formulário
  isEdit: boolean = false; // Flag para saber se estamos editando ou criando uma nova tarefa
  currentTime: string = ''; // Hora atual
  currentDate: Date = new Date(); // Data atual

  constructor() { }

  ngOnInit(): void {
    this.updateTime(); // Atualiza a hora constantemente
  }

  // Função para adicionar ou atualizar tarefa
  addOrUpdateTask(): void {
    if (!this.taskContent.trim()) {
      return; // Não faz nada se o conteúdo da tarefa estiver vazio
    }

    if (this.isEdit) {
      // Se estamos no modo de edição, encontramos a tarefa e atualizamos
      const taskIndex = this.tasks.findIndex(task => task.id === this.tasks[0].id);
      if (taskIndex !== -1) {
        this.tasks[taskIndex].content = this.taskContent;
      }
      this.isEdit = false;
    } else {
      // Se não estamos editando, criamos uma nova tarefa
      const newTask: Task = {
        id: this.generateId(),
        content: this.taskContent,
        completed: false
      };
      this.tasks.push(newTask);
    }

    this.taskContent = ''; // Limpa o campo de texto após salvar
  }

  // Função para editar uma tarefa
  editTask(task: Task): void {
    this.taskContent = task.content;
    this.isEdit = true;
    this.tasks = this.tasks.filter(t => t.id !== task.id); // Remove tarefa da lista ao editar
  }

  // Função para excluir uma tarefa
  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }

  // Função para gerar um ID único para a tarefa
  private generateId(): number {
    return new Date().getTime();
  }

  // Função para atualizar a hora a cada minuto
  private updateTime(): void {
    setInterval(() => {
      const now = new Date();
      this.currentTime = now.toLocaleTimeString();
    }, 60000); // Atualiza a cada 60 segundos
  }
}
