"""Build one versioned stylesheet and update HTML asset versions before deployment."""
from pathlib import Path
import hashlib
import re
root = Path(__file__).resolve().parent.parent
css = '\n'.join((root / file).read_text() for file in ['styles.css', 'remodel.css'])
(root / 'site.css').write_text(css)
css_version = hashlib.sha256(css.encode()).hexdigest()[:12]
js_version = hashlib.sha256((root / 'script.js').read_bytes()).hexdigest()[:12]
for name in ['index.html', 'demo.html']:
    page = root / name
    text = page.read_text()
    text = re.sub(r'<link rel="stylesheet" href="(?:styles|remodel|site)\.css(?:\?[^"]*)?">', '', text)
    text = text.replace('</head>', f'<link rel="stylesheet" href="site.css?v={css_version}"></head>')
    text = re.sub(r'src="script\.js(?:\?[^"]*)?"', f'src="script.js?v={js_version}"', text)
    page.write_text(text)
print('Built versioned CSS and JavaScript references.')
