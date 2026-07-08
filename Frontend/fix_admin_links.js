const fs = require('fs');
const path = require('path');

const filesToFix = [
  'Dashboard.jsx',
  'managebookings.jsx',
  'managedestination.jsx',
  'managemessages.jsx',
  'managereview.jsx',
  'managetourpackage.jsx',
  'ManageUsers.jsx'
];

const basePath = path.join(__dirname, 'src', 'Pages');

filesToFix.forEach(file => {
  const filePath = path.join(basePath, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace hardcoded /manage-x with /admin/x
    content = content.replace(/to="\/manage-destinations"/g, 'to="/admin/destinations"');
    content = content.replace(/to="\/manage-packages"/g, 'to="/admin/packages"');
    content = content.replace(/to="\/manage-bookings"/g, 'to="/admin/bookings"');
    content = content.replace(/to="\/manage-reviews"/g, 'to="/admin/reviews"');
    content = content.replace(/to="\/manage-messages"/g, 'to="/admin/messages"');
    content = content.replace(/to="\/manage-users"/g, 'to="/admin/users"');
    content = content.replace(/to="\/customers"/g, 'to="/admin/users"');
    
    // Convert <a>...Overview...</a> into <Link to="/admin/dashboard"...>
    if (file === 'Dashboard.jsx' || file === 'managetourpackage.jsx' || file === 'ManageUsers.jsx' || file === 'managebookings.jsx' || file === 'managereview.jsx' || file === 'managemessages.jsx' || file === 'managedestination.jsx') {
      // Find a tag containing Overview. 
      // e.g. <a href="#" className="...">...<span...>Overview</span></a>
      // It might be multiline.
      const overviewRegex = /<a href="#"([^>]*className="[^"]*")[^>]*>([\s\S]*?)<span([^>]*)>Overview<\/span>([\s\S]*?)<\/a>/;
      if (overviewRegex.test(content)) {
        content = content.replace(overviewRegex, `<Link to="/admin/dashboard"$1>$2<span$3>Overview</span>$4</Link>`);
      }
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`Missing ${file}`);
  }
});
