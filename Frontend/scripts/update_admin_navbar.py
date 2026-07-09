import os
import re

files_to_update = [
    "src/Pages/ManageUsers.jsx",
    "src/Pages/managetourpackage.jsx",
    "src/Pages/managereview.jsx",
    "src/Pages/managemessages.jsx",
    "src/Pages/managedestination.jsx",
    "src/Pages/managebookings.jsx",
    "src/Pages/Dashboard.jsx"
]

for filepath in files_to_update:
    if not os.path.exists(filepath):
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if useNavigate is imported
    if "useNavigate" not in content and "react-router-dom" in content:
        content = re.sub(r'(import .*?from [\'"]react-router-dom[\'"];)', r'\1\nimport { useNavigate } from "react-router-dom";', content, count=1)
    elif "useNavigate" not in content:
        content = "import { useNavigate } from 'react-router-dom';\n" + content
        
    # Inject const navigate = useNavigate(); at the start of the component
    # Finds `const ComponentName = ({...}) => {` or `const ComponentName = () => {`
    comp_regex = r'(const \w+\s*=\s*(async\s*)?\([^)]*\)\s*=>\s*\{)'
    if 'useNavigate();' not in content:
        content = re.sub(comp_regex, r'\1\n  const navigate = useNavigate();', content, count=1)

    # Wrap the admin profile area with onClick
    # The div starts with `<div className="flex items-center space-x-3 border-l`
    pattern = r'(<div className="flex items-center space-x-3 border-l[^"]*)"'
    
    if 'onClick={() => navigate' not in content:
        content = re.sub(pattern, r'\1 cursor-pointer transition-all hover:bg-gray-50 hover:opacity-90" onClick={() => navigate("/admin/profile")}', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Updated admin navbars in all pages.")
