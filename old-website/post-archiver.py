import sys
from bs4 import BeautifulSoup

from title_to_filename import title_to_filename

def archive(f, folder):
	entries = f.findAll('div', {'class' : 'entry'})
	filenames = []
	for i, entry in enumerate(entries):
		filename = 'archive{0:03}-{1}.html' \
				   .format(i, title_to_filename(entry.find('h1').contents[0]))
		with open(folder + '/' + filename, 'w') as wf:
			wf.write(str(entry))
		filenames.append(filename)
	return filenames

def main(argv):
	if len(argv) != 4:
		print("<html> <index> <folder>")
		return
	html, index, folder = tuple(argv[1:])
	with open(html, "r") as f:
		filenames = archive(BeautifulSoup(f.read(), 'html.parser'), folder)
		with open(index, "w") as wf:
			for filename in reversed(filenames):
				wf.write(folder + '/' + filename + '\n')
				
if __name__ == "__main__":
	main(sys.argv)
