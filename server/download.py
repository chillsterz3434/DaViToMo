import os
import re
import wikipedia as wp
import sys

# this is the name of the Wikipedia page
main_page = "Morty_Smith"  # from the TV show "Rick & Morty"
#main_page = "Turing_Award"
#main_page = "The_Matrix"
# main_page = sys.argv[1] # getting arguments from index.js

# fetch the webpage
main = wp.page(main_page,auto_suggest=False)
print("== Downloading %s: %d links" % (main_page,len(main.links)))

# print("Downloading to 'data' folder")
# print("Remove or rename 'data' folder to download new dataset")
# print("Type Y and Enter to continue")
# yes = input().lower()
# if yes != "y": exit()

# make a data/ directory, if it doesn't exist
os.makedirs("data", exist_ok=True)

# add page, and all links on page to the list of pages to download
links = [main_page] + main.links
for link in links:
    # skip pages that are "List of" or "Category" pages
    if link.startswith("List"): continue

    # try to download the page
    print(link)
    try:
        page = wp.page(link,auto_suggest=False,preload=False)
    except wp.exceptions.PageError:
        print("    page not found, skipping")
        continue
    except wp.exceptions.DisambiguationError:
        print("    ambiguous name, skipping")
        continue
    except:
        print("    unexpected error, skipping")
        continue

    # check if we already downloaded the page, and skip if it exists
    pageid = page.pageid
    filename = "data/%s.txt" % pageid
    if os.path.exists(filename):
        print("    page previously saved, skipping")
        continue

    # get the title and text from the page
    title = page.title
    text = page.content
    # remove non-alphabetic characters from text
    clean_text = re.sub('[^A-Za-z]+', ' ', text)

    # save article as text file
    with open(filename,'w') as f:
        f.write("title: %s\n" % title)
        f.write("id: %s\n" % pageid)
        f.write(clean_text)
