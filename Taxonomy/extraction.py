import os
import csv

'''''''''''''''''''''''''''''''''''''''''''''''''''
Function: extract_frequencies_from_csv
Description: Finds frequencies and weights of terms
Parameters:
Returns: A dictionary with Key: term, Value: {frequency, weight}
'''''''''''''''''''''''''''''''''''''''''''''''''''
def find_frequencies_and_weights(input):
    # STEP 1: Get path and secondary information for calculations
    frequency_dict = {}
    #path = os.getcwd() + '\\Parser\\output\\' # input location
    folder = os.listdir(input) # folder at input location
    number_files = len(folder) # number of files for weight calculation

    # STEP 2: Calculate frequencies and weights
    for csv_name in folder:
        file_path = input + '\\' + csv_name 
        
        # csv from folder
        with open(file_path, 'r') as r, \
            open(file_path, 'a') as w:

            # objects for read and write
            rowreader = csv.reader(r, delimiter=',')
            writer = csv.writer(w)

            # skip first 3 lines
            next(rowreader) 
            next(rowreader)
            next(rowreader)

            for row in rowreader:
                #print(row[0])
                minidict = {} # {frequency, weight}
                frequency = int(row[2])
                weight = frequency / number_files # calculate weight of term

                if row[0] in frequency_dict: # term is already in frequency_dict
                    minidict = frequency_dict.get(row[0])
                    new_frequency = minidict.get("frequency") + frequency
                    minidict["frequency"] = new_frequency # update term frequency
                    new_weight = new_frequency / number_files
                    minidict["weight"] = new_weight # update term weight
                    row[2] = new_frequency
                    row.append(new_weight)
                    print("row"+str(row))
                    #writer.writerow(row)
                else: # term is not already in frequency_dict
                    minidict["frequency"] = frequency
                    minidict["weight"] = weight
                    row.append(weight)
                    print("row"+str(row))
                    #writer.writerow(row)
                #print(minidict)
                frequency_dict[row[0]] = minidict # update frequency_dict
                
                #print(frequency_dict)
    #print(frequency_dict)
    return frequency_dict