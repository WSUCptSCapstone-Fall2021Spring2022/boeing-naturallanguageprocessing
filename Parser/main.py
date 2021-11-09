#import argparse

#from documentInformation import DocumentInformation
from Parser import Spacy
#import database
#import csv
import time
# from Taxonomy import
from Parser import noun as Noun
#import sys
from Parser import output_writers
#import unit_tests
#import parsers

#import os
#from Parser import NLTK
from pathlib import Path

#import pdf_extract
#from Parser import txt_extract
from Parser import text_factory

#import noun

# Removed, use our program launcher instead and enter locations through command line
# def dir_path(path):
#     if os.path.isdir(path):
#         return path
#     else:
#         raise argparse.ArgumentTypeError(f"readable_dir:{path} is not a valid path")

#def parse_args(args):
#    parser = argparse.ArgumentParser()
#    parser.add_argument('--file', '-f', type=str, required=True, nargs='+', help='path to file to parse')
#    parser.add_argument('--path', '-f', type=dir_path, required=True, nargs='+', help='path to file to parse')
#    parser.add_argument('--database', '-d', action='store_true', required=False, help='triggers the use of a mysql database')
#    return parser.parse_args()


def main():

    print('starting')
    #path = parse_args(sys.argv).path[0]
    # Gets path from assumed position instead of args

    #path = os.getcwd() + '\\Parser\\data'
    #folder = os.listdir(path)

    data = Path('Parser/data')

    for file in data.iterdir():
        print("Processing file: " + file.name)
        #docInfo, total_nouns, total_sentences = parsers.run_parsers(file)

        #start timer
        startTime = time.time()

        # Get text from file
        #text, docInfo = pdf_extract.get_info(file)
        #text = txt_extract.get_info(file)
        text = text_factory.get_text(file)

        # parse file
        total_nouns, total_sentences = Spacy.run_parsers(text)
        #docInfo, total_nouns, total_sentences = Spacy.run_parsers(file)
        #docInfo, total_nouns, total_sentences = NLTK.run_parsers(file_path)

        # #     # end timer
        elapsedTime = time.time() - startTime
        totalTimeStr = "Total time: " + str(round(elapsedTime, 3)) + " sec" # used in .csv file


        # calculate unique nouns, total nouns
        unqNouns = len(total_nouns)
        sumNouns = Noun.calculate_num_nouns_occur(total_nouns)

        # placeholders for now, need to fix
        # totalTimeStr = "Total time: Uncomputed"
        # costPerNounStr = "Cost per noun: Uncomputed"

    # calculate cost per noun in milliseconds
        costPerNoun = (elapsedTime * 1000) / sumNouns
        costPerNounStr = "Cost per noun: " + str(round(costPerNoun, 3)) + " ms" # used in .csv file


        output_writers.to_csv(totalTimeStr, costPerNounStr, total_nouns, unqNouns, sumNouns, file)

    # for file in folder:
    #     file_path = path + '\\' + file

    #     # parse file
    #     docInfo, total_nouns, total_sentences = parsers.run_parsers(file_path)

    #     # calculate unique nouns, total nouns
    #     unqNouns = len(total_nouns)
    #     sumNouns = Noun.calculate_num_nouns_occur(total_nouns)

    #     # placeholders for now, need to fix
    #     totalTimeStr = "Total time: Uncomputed"
    #     costPerNounStr = "Cost per noun: Uncomputed"

    #     output_writers.to_csv(
    #         docInfo, totalTimeStr, costPerNounStr, total_nouns, unqNouns, sumNouns, file)

    # Removed, old code, we need to fix the timer
    #args = parse_args(sys.argv[1:])

    #for file_path in args.file:
    #    if not parsers.validate_file(file_path):
    #        continue

         # start timer
     #   startTime = time.time()

    #     # parse file
    #    docInfo, total_nouns, total_sentences = parsers.run_parsers(file_path)

    # #     # end timer
    #     elapsedTime = time.time() - startTime
    #     totalTimeStr = "Total time: " + str(round(elapsedTime, 3)) + " sec" # used in .csv file

    # #     # calculate unique nouns, total nouns
    #     unqNouns = len(total_nouns)
    #     sumNouns = noun.calculate_num_nouns_occur(total_nouns)

    # #     # calculate cost per noun in milliseconds
    #     costPerNoun = (elapsedTime * 1000) / sumNouns
    #     costPerNounStr = "Cost per noun: " + str(round(costPerNoun, 3)) + " ms" # used in .csv file

    #     if args.database is True:
    #         # Get server information from user and create a new database in the server
    #         (session_host, session_user, session_password) = database.get_server_info()
    #         db_name = database.create_database(session_host, session_user, session_password)

    #         # Create connection to this new database & store database connection object for further use
    #         connection = database.connect_database(session_host, session_user, session_password, db_name)

    #         # Create tables in database
    #         database.create_tables(connection)

    #         # Insert information into tables
    #         database.insert_documents(docInfo, connection)
    #         database.insert_sentences(total_sentences, connection)
    #         database.insert_nouns(total_nouns, connection)
    #         database.insert_noun_in_sent(total_nouns, connection)

    #         connection.close()
    #         print("Data has been successfully exported to the database %s", db_name)
    #     else:
    #         output_writers.to_csv(docInfo, totalTimeStr, costPerNounStr, total_nouns, unqNouns, sumNouns)

    # unit_tests.test_accuracy()
    # unit_tests.test_info_parsing()
    # unit_tests.test_sentence_punc()
# Removed, use our program instead
if __name__ == "__main__":
    main()
