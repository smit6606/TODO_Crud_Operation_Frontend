const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

// A mapping of old file bases to their exact new src-relative path
const mapping = {
    // Auth
    'AuthButton': 'Components/Auth/AuthButton',
    'AuthLeftHero': 'Components/Auth/AuthLeftHero',
    'AuthFormLayout': 'Components/Auth/AuthFormLayout',
    'FormInput': 'Components/Auth/FormInput',
    'SocialIcon': 'Components/Auth/SocialIcon',
    
    // Profile
    'ChangePasswordModal': 'Components/Profile/ChangePasswordModal',
    
    // Layout
    'Header': 'Components/Layout/Header',
    'Sidebar': 'Components/Layout/Sidebar',
    'Footer': 'Components/Layout/Footer',
    
    // Common elements mapping cleanly
    'ButtonLoader': 'Components/common/ButtonLoader',
    'CustomLoader': 'Components/common/CustomLoader',
    'ErrorAlert': 'Components/common/ErrorAlert',
    'Shimmer': 'Components/common/Shimmer',
    
    // Route guards
    'ProtectedRoute': 'Routes/ProtectedRoute',
    'PublicRoute': 'Routes/PublicRoute',
    
    // View/Page normalization
    'AddTodoPage': 'Pages/Todos/AddTodoPage',
    'EditTodoPage': 'Pages/Todos/EditTodoPage',
    'TodoListView': 'Pages/Todos/TodoListPage',
    'ViewDetailedTodo': 'Pages/Todos/ViewDetailedTodoPage',
    'NotFound': 'Pages/NotFoundPage'
};

const getRelativePath = (fromFile, toSrcRelative) => {
    const fromDir = path.dirname(fromFile);
    const toPath = path.join(srcDir, toSrcRelative);
    
    let rel = path.relative(fromDir, toPath).replace(/\\/g, '/');
    if (!rel.startsWith('.')) rel = './' + rel;
    return rel;
};

const processDir = (dir) => {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            for (const [basename, newSrcRelative] of Object.entries(mapping)) {
                // Look for: import { ... } from "*(/basename)" or import X from "*(/basename)"
                // Extremely flexible regex mapping any depth of "../" or "./" 
                const regex = new RegExp(`from\\s+['"]([./]+.*?/?${basename}(?:\\.tsx?)?)['"]`, 'g');
                
                content = content.replace(regex, (match, oldPath) => {
                    const newRel = getRelativePath(fullPath, newSrcRelative);
                    modified = true;
                    // Keep the exact same quote style
                    return match.replace(oldPath, newRel);
                });
            }

            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`[Patched Imports] ${path.relative(__dirname, fullPath)}`);
            }
        }
    });
};

processDir(srcDir);
console.log("Import Patching Complete.");
