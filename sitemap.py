import json
import os

def generate_sitemap_styles(data):

    # 开始构建sitemap的内容，这里使用XHTML语法
    sitemap_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_content += '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n'
    sitemap_content += '<html xmlns="http://www.w3.org/1999/xhtml">\n'
    sitemap_content += '<head>\n'
    sitemap_content += '<title>Sitemap</title>\n'
    sitemap_content += '<style type="text/css">\n'
    sitemap_content += '  body { font-family: Arial, sans-serif; }\n'
    sitemap_content += '  .url { margin-bottom: 10px; }\n'
    sitemap_content += '  .loc { font-weight: bold; }\n'
    sitemap_content += '  .priority { color: #888; }\n'
    sitemap_content += '</style>\n'
    sitemap_content += '</head>\n'
    sitemap_content += '<body>\n'

    # 遍历页面信息，为每个页面生成sitemap条目
    for page in data['pages']:
        sitemap_content += '<div class="url">\n'
        sitemap_content += f'  <span class="loc">{domain}{page["url"]}</span><br />\n'
        sitemap_content += f'    <!-- Page Name: {page["pageName"]} -->\n'
        sitemap_content += f'  <span class="priority">Priority: {page["priority"]}</span>\n'
        sitemap_content += '</div>\n'

    # 结束sitemap的内容
    sitemap_content += '</body>\n'
    sitemap_content += '</html>'

    # 将sitemap内容写入文件
    with open('./itsmeucu.github.io/sitemap.xhtml', 'w', encoding='utf-8') as file:
        file.write(sitemap_content)

    print('Sitemap generated successfully with styles.')

def generate_sitemap(data):

    # 开始构建sitemap的内容
    sitemap_content = '<?xml version="1.0" encoding="UTF-8"?>\n'
    sitemap_content += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    # 遍历页面信息，为每个页面生成sitemap条目
    for page in data['pages']:
        sitemap_content += '  <url>\n'
        sitemap_content += f'    <loc>{domain}{page["url"]}</loc>\n'
        sitemap_content += f'    <!-- Page Name: {page["pageName"]} -->\n'
        sitemap_content += f'    <priority>{page["priority"]}</priority>\n'
        sitemap_content += '  </url>\n'

    # 结束sitemap的内容
    sitemap_content += '</urlset>'

    # 将sitemap内容写入文件
    with open('./itsmeucu.github.io/sitemap.xml', 'w', encoding='utf-8') as file:
        file.write(sitemap_content)

    print('Sitemap generated successfully.')

def copySitemap(data):
#     with open('./itsmeucu.github.io/sitemap.json', 'w', encoding='utf-8') as f:
#         f.write(json.dumps(data, indent=4))
    os.system('cp ./sitemap.json ./itsmeucu.github.io/sitemap.json')

    print('Sitemap copied successfully.')

if __name__ == '__main__':
    # 你的网站域名
    domain = 'blog.ucu520.top'

    with open('./sitemap.json', 'r', encoding='utf-8') as f:
        json_data = json.load(f)
    # 合并所有子列表为一个列表
    merged_pages = json_data["pages"]

    # 由于"tc"键对应的值是一个列表的列表，我们需要先将其展平
    for sublist in json_data["tc"]:
        merged_pages.extend(sublist)
#     for sublist in json_data["un"]:
#         merged_pages.extend(sublist)
#     for sublist in json_data["da"]:
#         merged_pages.extend(sublist)
#     for sublist in json_data["old"]:
#         merged_pages.extend(sublist)

    # 将其他键对应的列表也添加到合并后的列表中
    merged_pages.extend(json_data["un"])
    merged_pages.extend(json_data["da"])
    merged_pages.extend(json_data["old"])

    # 创建最终的JSON结构
    final_json = {"pages": merged_pages}

    # 打印或者将final_json转换为JSON字符串
#     print(json.dumps(final_json, indent=2))
    generate_sitemap(final_json)
    generate_sitemap_styles(final_json)
    copySitemap(final_json)
