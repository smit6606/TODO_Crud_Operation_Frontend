const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const moves = {
    // Auth UI to Components
    "src/Pages/Auth/AuthButton.tsx": "src/Components/Auth/AuthButton.tsx",
    "src/Pages/Auth/AuthLeftHero.tsx": "src/Components/Auth/AuthLeftHero.tsx",
    "src/Pages/Auth/AuthFormLayout.tsx": "src/Components/Auth/AuthFormLayout.tsx",
    "src/Pages/Auth/FormInput.tsx": "src/Components/Auth/FormInput.tsx",
    "src/Pages/Auth/SocialIcon.tsx": "src/Components/Auth/SocialIcon.tsx",
    
    // Profile components
    "src/Pages/Profile/ChangePasswordModal.tsx": "src/Components/Profile/ChangePasswordModal.tsx",
    
    // Layout core
    "src/Components/Header.tsx": "src/Components/Layout/Header.tsx",
    "src/Components/Sidebar.tsx": "src/Components/Layout/Sidebar.tsx",
    "src/Components/Footer.tsx": "src/Components/Layout/Footer.tsx",
    
    // Common elements mapping cleanly
    "src/Components/ButtonLoader.tsx": "src/Components/common/ButtonLoader.tsx",
    "src/Components/CustomLoader.tsx": "src/Components/common/CustomLoader.tsx",
    
    // Route guards
    "src/Components/common/ProtectedRoute.tsx": "src/Routes/ProtectedRoute.tsx",
    "src/Components/common/PublicRoute.tsx": "src/Routes/PublicRoute.tsx",
    
    // View/Page normalization
    "src/Pages/To-Do/AddTodoPage.tsx": "src/Pages/Todos/AddTodoPage.tsx",
    "src/Pages/To-Do/EditTodoPage.tsx": "src/Pages/Todos/EditTodoPage.tsx",
    "src/Pages/To-Do/TodoListView.tsx": "src/Pages/Todos/TodoListPage.tsx",
    "src/Pages/To-Do/ViewDetailedTodo.tsx": "src/Pages/Todos/ViewDetailedTodoPage.tsx",
    "src/Components/common/NotFound.tsx": "src/Pages/NotFoundPage.tsx"
};

// 1. Create directories
console.log("Creating Target Directories...");
for(let target of Object.values(moves)) {
    const dir = path.dirname(path.join(__dirname, target));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

// 2. Perform Physical moves
console.log("Moving files...");
for(let [source, target] of Object.entries(moves)) {
    const srcPath = path.join(__dirname, source);
    const destPath = path.join(__dirname, target);
    if (fs.existsSync(srcPath)) {
        fs.renameSync(srcPath, destPath);
        console.log(`[Moved] ${source} -> ${target}`);
    } else {
        console.log(`[Skipped] Source missing: ${source}`);
    }
}

// 3. Clean up loose ends
console.log("Cleaning up leftovers...");
try { 
    fs.unlinkSync(path.join(srcDir, "Pages/Auth/RegisterPage.tsx")); 
    console.log("[Deleted] Removed empty RegisterPage.tsx");
} catch(e){}

try { 
    fs.rmSync(path.join(srcDir, "Pages/To-Do"), { recursive: true, force: true }); 
    console.log("[Deleted] Old To-Do directory purged");
} catch(e){}

console.log("Relocation Complete. Next step: TS Path Linkage Regex");
