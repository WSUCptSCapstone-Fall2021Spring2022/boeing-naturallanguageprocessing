import csv
#import documentInformation
import os

# Output location
output = os.getcwd() + '\\Parser\\output\\'  # Added \\parser to fix output location

def to_csv(docInfo, totalTimeStr, costPerNounStr, total_nouns, unqNouns, sumNouns, file):
    # Open csv files to write to

    #print(docInfo.document_name)
    #print(docInfo.document_name)

    # if docInfo.document_name != None:
    #     csv_name = docInfo.document_name + '_nouns.csv'
    # else:
    #     csv_name = (docInfo.location.split('/'))[-1][:-4] + '_nouns.csv' # get name of file from file_path (removes ".pdf" too)

    #print((file.split('/'))[-1][:-4] + '_nouns.csv')

    csv_name = (file.split('/'))[-1][:-4] + '_nouns.csv' # Changed logic so that it uses file name instead of docInfo.document_name (removes ".pdf" too)

    # if csv_name[0:4] == "data":
    #     csv_name = csv_name[5:]

    #print(csv_name)

    with open(output + csv_name, 'w', newline='', encoding='utf-8') as csvfile: # Added encoding for non-printable characters
        nounwriter = csv.writer(csvfile)
        nounwriter.writerow([csv_name]) # Not really necessary, docInfo.authors]) # can add more attributes too
        nounwriter.writerow(["Unique nouns: " + str(unqNouns), " Total nouns: " + str(sumNouns)])
        nounwriter.writerow([totalTimeStr, costPerNounStr])
        
        for noun in total_nouns:
            
            #try:
            nounwriter.writerow([noun.text, noun.context_sentences, noun.num_occur])
            #except UnicodeEncodeError:
                #print(noun)

        print('Data has been successfully saved to ' + csv_name)
    
    return csv_name