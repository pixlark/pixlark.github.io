def valid_char(c):
	return \
		(ord(c) >= ord('A') and ord(c) <= ord('Z')) or \
		(ord(c) >= ord('a') and ord(c) <= ord('z'))

def title_to_filename(title):
	return ''.join(list(filter(valid_char, title)))
