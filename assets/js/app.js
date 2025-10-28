class TodoApp {
    constructor() {
        this.tasks = this.loadTasks();
        this.currentFilter = 'all';
        this.currentPriorityFilter = 'all';
        this.currentSort = 'date-desc';
        this.init();
    }

    init() {
        this.showLoadingScreen();
        setTimeout(() => {
            this.bindEvents();
            this.render();
            this.updateProgress();
            this.setupKeyboardShortcuts();
            this.hideLoadingScreen();
        }, 1500);
    }

    bindEvents() {
        // Dark Mode Toggle
        document.getElementById('darkModeToggle').addEventListener('click', () => {
            this.toggleDarkMode();
        });

        // Add Task Button
        document.getElementById('addTaskBtn').addEventListener('click', () => {
            this.showAddTaskModal();
        });

        // Quick Add
        document.getElementById('quickAddBtn').addEventListener('click', () => {
            this.quickAddTask();
        });

        document.getElementById('quickAddInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.quickAddTask();
            }
        });

        // Add Task Form
        document.getElementById('addTaskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Edit Task Form
        document.getElementById('editTaskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateTask();
        });

        // Filter Buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // Priority Filter Buttons
        document.querySelectorAll('.priority-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setPriorityFilter(e.target.dataset.priority);
            });
        });

        // Sort Select
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.setSort(e.target.value);
        });

        // Modal Controls
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                this.closeModals();
            });
        });

        // Delete Confirmation
        document.getElementById('confirmDelete').addEventListener('click', () => {
            this.deleteTask();
        });

        // Clear All Confirmation
        document.getElementById('confirmClearAll').addEventListener('click', () => {
            this.clearAllTasks();
        });

        // Clear All Button
        document.getElementById('clearAllBtn').addEventListener('click', () => {
            this.showClearAllModal();
        });

        // Export/Import
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.showImportExportModal();
        });

        document.getElementById('importBtn').addEventListener('click', () => {
            this.showImportExportModal();
        });

        document.getElementById('exportDataBtn').addEventListener('click', () => {
            this.exportData();
        });

        document.getElementById('importDataBtn').addEventListener('click', () => {
            this.importData();
        });

        // Click outside modal to close
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModals();
                }
            });
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + N: New task
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                this.showAddTaskModal();
            }
            
            // Ctrl/Cmd + E: Export data
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                this.exportData();
            }
            
            // Ctrl/Cmd + I: Import data
            if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
                e.preventDefault();
                this.showImportExportModal();
            }
            
            // Escape: Close modals
            if (e.key === 'Escape') {
                this.closeModals();
            }
        });
    }

    toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        
        const icon = document.querySelector('#darkModeToggle i');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    quickAddTask() {
        const input = document.getElementById('quickAddInput');
        const title = input.value.trim();
        
        if (title) {
            const task = {
                id: Date.now(),
                title: title,
                description: '',
                priority: 'medium',
                completed: false,
                createdAt: new Date().toISOString()
            };
            
            this.tasks.push(task);
            this.saveTasks();
            this.render();
            this.updateProgress();
            input.value = '';
            this.showNotification('Task berhasil ditambahkan', 'success');
        }
    }

    addTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const priority = document.getElementById('taskPriority').value;
        
        if (!this.validateTask(title, description)) {
            return;
        }
        
        const task = {
            id: Date.now(),
            title: title,
            description: description,
            priority: priority,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.tasks.push(task);
        this.saveTasks();
        this.render();
        this.updateProgress();
        this.closeModals();
        document.getElementById('addTaskForm').reset();
        this.showNotification('Task berhasil ditambahkan', 'success');
    }

    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            document.getElementById('editTaskId').value = task.id;
            document.getElementById('editTaskTitle').value = task.title;
            document.getElementById('editTaskDescription').value = task.description;
            document.getElementById('editTaskPriority').value = task.priority;
            this.showEditTaskModal();
        }
    }

    updateTask() {
        const id = parseInt(document.getElementById('editTaskId').value);
        const title = document.getElementById('editTaskTitle').value.trim();
        const description = document.getElementById('editTaskDescription').value.trim();
        const priority = document.getElementById('editTaskPriority').value;
        
        if (!this.validateTask(title, description)) {
            return;
        }
        
        const taskIndex = this.tasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = {
                ...this.tasks[taskIndex],
                title: title,
                description: description,
                priority: priority
            };
            
            this.saveTasks();
            this.render();
            this.updateProgress();
            this.closeModals();
            this.showNotification('Task berhasil diperbarui', 'success');
        }
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
            this.updateProgress();
            
            const message = task.completed ? 'Task selesai!' : 'Task dibuka kembali';
            this.showNotification(message, 'success');
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.render();
        this.updateProgress();
        this.closeModals();
        this.showNotification('Task berhasil dihapus', 'success');
    }

    setFilter(filter) {
        this.currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        this.render();
    }

    setPriorityFilter(priority) {
        this.currentPriorityFilter = priority;
        document.querySelectorAll('.priority-filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-priority="${priority}"]`).classList.add('active');
        this.render();
    }

    setSort(sort) {
        this.currentSort = sort;
        this.render();
    }

    getFilteredAndSortedTasks() {
        let filteredTasks = [...this.tasks];
        
        // Filter by status
        if (this.currentFilter === 'active') {
            filteredTasks = filteredTasks.filter(task => !task.completed);
        } else if (this.currentFilter === 'completed') {
            filteredTasks = filteredTasks.filter(task => task.completed);
        }
        
        // Filter by priority
        if (this.currentPriorityFilter !== 'all') {
            filteredTasks = filteredTasks.filter(task => task.priority === this.currentPriorityFilter);
        }
        
        // Sort tasks
        filteredTasks.sort((a, b) => {
            switch (this.currentSort) {
                case 'date-desc':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'date-asc':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                case 'priority-high':
                    const priorityOrder = { high: 3, medium: 2, low: 1 };
                    return priorityOrder[b.priority] - priorityOrder[a.priority];
                case 'priority-medium':
                    const mediumOrder = { medium: 3, high: 2, low: 1 };
                    return mediumOrder[b.priority] - mediumOrder[a.priority];
                case 'priority-low':
                    const lowOrder = { low: 3, medium: 2, high: 1 };
                    return lowOrder[b.priority] - lowOrder[a.priority];
                default:
                    return 0;
            }
        });
        
        return filteredTasks;
    }

    render() {
        const taskList = document.getElementById('taskList');
        const filteredTasks = this.getFilteredAndSortedTasks();
        
        if (filteredTasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-clipboard-list"></i>
                    <p>Tidak ada task yang ditemukan</p>
                </div>
            `;
            return;
        }
        
        taskList.innerHTML = filteredTasks.map(task => `
            <div class="task-card ${task.completed ? 'completed' : ''} ${task.priority}-priority" data-id="${task.id}">
                <div class="task-header">
                    <div>
                        <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
                        <div class="task-meta">
                            <span class="task-date">${this.formatDate(task.createdAt)}</span>
                            <span class="task-priority priority-${task.priority}">${this.getPriorityText(task.priority)}</span>
                        </div>
                    </div>
                </div>
                ${task.description ? `<p class="task-description">${this.escapeHtml(task.description)}</p>` : ''}
                <div class="task-actions">
                    <button class="task-btn complete" onclick="app.toggleTask(${task.id})" title="${task.completed ? 'Mark as incomplete' : 'Mark as complete'}">
                        <i class="fas fa-${task.completed ? 'undo' : 'check'}"></i>
                    </button>
                    <button class="task-btn edit" onclick="app.editTask(${task.id})" title="Edit task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="task-btn delete" onclick="app.showDeleteModal(${task.id})" title="Delete task">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        // Add double click to edit
        document.querySelectorAll('.task-card').forEach(card => {
            card.addEventListener('dblclick', () => {
                const id = parseInt(card.dataset.id);
                this.editTask(id);
            });
        });
    }

    updateProgress() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(task => task.completed).length;
        const percentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        
        document.getElementById('progressBar').style.width = `${percentage}%`;
        document.getElementById('progressText').textContent = `${percentage}%`;
        document.getElementById('completedCount').textContent = completedTasks;
        document.getElementById('totalCount').textContent = totalTasks;
    }

    showAddTaskModal() {
        document.getElementById('addTaskModal').classList.add('active');
    }

    showEditTaskModal() {
        document.getElementById('editTaskModal').classList.add('active');
    }

    showDeleteModal(id) {
        document.getElementById('deleteTaskId').value = id;
        document.getElementById('deleteModal').classList.add('active');
    }

    showClearAllModal() {
        if (this.tasks.length === 0) {
            this.showNotification('Tidak ada task untuk dihapus', 'info');
            return;
        }
        document.getElementById('clearAllModal').classList.add('active');
    }

    showImportExportModal() {
        document.getElementById('importExportModal').classList.add('active');
    }

    closeModals() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
    }

    clearAllTasks() {
        this.tasks = [];
        this.saveTasks();
        this.render();
        this.updateProgress();
        this.closeModals();
        this.showNotification('Semua task telah dihapus', 'success');
    }

    exportData() {
        const data = {
            tasks: this.tasks,
            exportDate: new Date().toISOString(),
            version: '1.0',
            totalTasks: this.tasks.length,
            completedTasks: this.tasks.filter(t => t.completed).length
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `todo-list-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.closeModals();
        this.showNotification('Data berhasil diekspor', 'success');
    }

    importData() {
        const fileInput = document.getElementById('importFile');
        const file = fileInput.files[0];
        
        if (!file) {
            this.showNotification('Pilih file untuk diimpor', 'warning');
            return;
        }
        
        if (file.type !== 'application/json') {
            this.showNotification('File harus berformat JSON', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (!data.tasks || !Array.isArray(data.tasks)) {
                    this.showNotification('Format file tidak valid', 'error');
                    return;
                }
                
                // Validate imported tasks
                const validTasks = data.tasks.filter(task => 
                    task.id && task.title && task.priority && task.createdAt
                );
                
                if (validTasks.length === 0) {
                    this.showNotification('Tidak ada task valid yang ditemukan', 'error');
                    return;
                }
                
                this.tasks = validTasks;
                this.saveTasks();
                this.render();
                this.updateProgress();
                this.closeModals();
                fileInput.value = '';
                this.showNotification(`${validTasks.length} task berhasil diimpor`, 'success');
                
            } catch (error) {
                this.showNotification('Error membaca file: ' + error.message, 'error');
            }
        };
        reader.readAsText(file);
    }

    showLoadingScreen() {
        document.getElementById('loadingScreen').classList.remove('hidden');
    }

    hideLoadingScreen() {
        setTimeout(() => {
            document.getElementById('loadingScreen').classList.add('hidden');
        }, 500);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    validateTask(title, description) {
        if (!title || title.trim().length === 0) {
            this.showNotification('Judul task tidak boleh kosong', 'error');
            return false;
        }
        
        if (title.length > 100) {
            this.showNotification('Judul task terlalu panjang (maksimal 100 karakter)', 'error');
            return false;
        }
        
        if (description && description.length > 500) {
            this.showNotification('Deskripsi terlalu panjang (maksimal 500 karakter)', 'error');
            return false;
        }
        
        return true;
    }

    saveTasks() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        const saved = localStorage.getItem('todoTasks');
        return saved ? JSON.parse(saved) : [];
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) {
            return 'Hari ini';
        } else if (diffDays === 1) {
            return 'Kemarin';
        } else if (diffDays < 7) {
            return `${diffDays} hari lalu`;
        } else {
            return date.toLocaleDateString('id-ID');
        }
    }

    getPriorityText(priority) {
        const priorityMap = {
            high: 'Tinggi',
            medium: 'Sedang',
            low: 'Rendah'
        };
        return priorityMap[priority] || priority;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app
const app = new TodoApp();

// Load dark mode preference
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    document.querySelector('#darkModeToggle i').className = 'fas fa-sun';
}

// Add some sample tasks if none exist
if (app.tasks.length === 0) {
    const sampleTasks = [
        {
            id: 1,
            title: 'Belajar JavaScript',
            description: 'Mempelajari konsep dasar JavaScript dan ES6+',
            priority: 'high',
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: 2,
            title: 'Membuat proyek web',
            description: 'Membuat aplikasi web sederhana dengan HTML, CSS, dan JavaScript',
            priority: 'medium',
            completed: false,
            createdAt: new Date(Date.now() - 86400000).toISOString()
        },
        {
            id: 3,
            title: 'Membaca buku',
            description: 'Membaca bu tentang web development',
            priority: 'low',
            completed: true,
            createdAt: new Date(Date.now() - 172800000).toISOString()
        }
    ];
    
    app.tasks = sampleTasks;
    app.saveTasks();
    app.render();
    app.updateProgress();
}

// Add notification styles to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        padding: 15px 20px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-left: 4px solid #2ed573;
    }
    
    .notification.error {
        border-left: 4px solid #ff4757;
    }
    
    .notification.warning {
        border-left: 4px solid #ffa502;
    }
    
    .notification.info {
        border-left: 4px solid #3742fa;
    }
    
    .notification i {
        font-size: 1.2rem;
    }
    
    .notification.success i {
        color: #2ed573;
    }
    
    .notification.error i {
        color: #ff4757;
    }
    
    .notification.warning i {
        color: #ffa502;
    }
    
    .notification.info i {
        color: #3742fa;
    }
    
    body.dark-mode .notification {
        background: rgba(44, 62, 80, 0.95);
        color: white;
    }
    
    body.dark-mode .notification.success i {
        color: #2ed573;
    }
    
    body.dark-mode .notification.error i {
        color: #ff4757;
    }
    
    body.dark-mode .notification.warning i {
        color: #ffa502;
    }
    
    body.dark-mode .notification.info i {
        color: #3742fa;
    }
`;
document.head.appendChild(notificationStyles);