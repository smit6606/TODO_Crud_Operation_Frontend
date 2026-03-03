const fs = require('fs');

let file = fs.readFileSync('src/Pages/Todos/TodoListPage.tsx', 'utf8');

const target1 = `CheckCircle2, Ban`;
file = file.replace(target1, `CheckCircle2`);

const target2 = `                                                {(todo.status || "").toLowerCase() !== 'completed' ? (
                                                    <Link to={\`/todos/\${todo.id}/edit\`} className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-brand-primary)] hover:bg-[var(--color-bg-base)] rounded-lg transition-colors inline-block">
                                                        <Edit2 size={16} />
                                                    </Link>
                                                ) : (
                                                    <div className="p-1.5 text-[var(--color-text-muted)] flex items-center gap-1.5 px-2 bg-[var(--color-bg-base)] rounded-lg border border-[var(--color-border-subtle)]" title="Completed tasks are locked">
                                                        <Ban size={14} />
                                                        <span className="text-[10px] font-bold uppercase tracking-wider">Locked</span>
                                                    </div>
                                                )}`;

const replacement2 = `                                                {(todo.status || "").toLowerCase() !== 'completed' && (
                                                    <Link to={\`/todos/\${todo.id}/edit\`} className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-brand-primary)] hover:bg-[var(--color-bg-base)] rounded-lg transition-colors inline-block">
                                                        <Edit2 size={16} />
                                                    </Link>
                                                )}`;

// Apply exact replacements
file = file.replace(target2, replacement2);

fs.writeFileSync('src/Pages/Todos/TodoListPage.tsx', file);
