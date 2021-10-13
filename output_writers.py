import csv
import documentInformation

# Output location
output = 'C:\\Users\\blcsi\\OneDrive\\Desktop\\pilot-operating-handbook-text-analysis-master\\output\\' 

def to_csv(docInfo, totalTimeStr, costPerNounStr, total_nouns, unqNouns, sumNouns):
    # Open csv files to write to

    #print(docInfo.document_name)
    #print(docInfo.document_name)

    if docInfo.document_name != None:
        csv_name = docInfo.document_name + '_nouns.csv'
    else:
        csv_name = (docInfo.location.split('/'))[-1][:-4] + '_nouns.csv' # get name of file from file_path (removes ".pdf" too)

    #print(csv_name)
    if csv_name[0:4] == "data":
        csv_name = csv_name[5:]

    with open(output + csv_name, 'w', newline='') as csvfile:
        nounwriter = csv.writer(csvfile)
        nounwriter.writerow([docInfo.document_name, docInfo.authors]) # can add more attributes too
        nounwriter.writerow(["Unique nouns: " + str(unqNouns), " Total nouns: " + str(sumNouns)])
        nounwriter.writerow([totalTimeStr, costPerNounStr])
        for noun in total_nouns:
            nounwriter.writerow([noun.text, noun.context_sentences, noun.num_occur])
        print('Data has been successfully saved to ' + csv_name)
    
    return csv_name