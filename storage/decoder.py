import urllib.parse


def decoded_file_path(serializer):
    file_path = urllib.parse.urlparse(serializer.data[0]['file']).path[1:]
    decoded_filename = urllib.parse.unquote(file_path.split('/')[-1])
    return file_path.replace(file_path.split('/')[1], decoded_filename)