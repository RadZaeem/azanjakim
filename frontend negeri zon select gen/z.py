import csv
path="kodzon.csv"

a={}
i=0
previous_state = ""
current_state = ""
previous_code = ""
current_code = ""
contents_str = ""
first = True
with open(path) as csvfile:
    reader = csv.DictReader(csvfile)

    for row in reader:
        if first:
            current_state = row["State"]#.lower()
            previous_state = current_state
            a[current_state] = []
            a[current_state].append(
                {"value": "null", "content": "Pilih Zon"})
            current_code = row["Code"]
            previous_code =current_code
            contents_str = current_code + ": "
            first = False



        previous_state =  current_state
        current_state = row["State"]#.lower()
        # print(state)
        # print(previous_state + current_state + str(previous_state == current_state))

        if (previous_state != current_state):
            # a[current_state].append(
            #     {"value": previous_code, "content": contents_str[:-2]})
            # contents_str = current_code + ": "

            a[current_state] = [] #JHR01, JHR02..
            a[current_state].append(
                {"value": "null", "content": "Pilih Zon"})

            # print(a)
        # print (a[current_state])

        previous_code = current_code
        current_code = row["Code"]
        # print(previous_code + current_code + str(previous_code is current_code))
        # contents_str += row["Zone"] + ", "
        # if (previous_code is current_code):
        #     pass


        if (previous_code != current_code):
            # print(previous_code + " " + current_code)
        #     #push
        #     if (contents_str):
        #         contents_str = contents_str[:-1] # delete trailing comma
            if (previous_state == current_state):
                a[current_state].append(
                {"value": previous_code, "content": contents_str[:-2]})
            elif (previous_state != current_state):
                a[previous_state].append(
                {"value": previous_code, "content": contents_str[:-2]})

        #     #then reset
        #     # current_code = code
        #     # a[current_state] = []
            contents_str = current_code + ": "
        contents_str += row["Zone"] + ", "

import pprint
print(str(a).replace("'value'","value").replace("'content'","content"))
