import argparse
from documentInformation import DocumentInformation
import parsers
import database
import csv
import time
import noun
import sys
import output_writers
import unit_tests
import multiprocessing

import os


def dir_path(path):
    if os.path.isdir(path):
        return path
    else:
        raise argparse.ArgumentTypeError(
            f"readable_dir:{path} is not a valid path")


def parse_args(args):
    parser = argparse.ArgumentParser()
    # parser.add_argument('--file', '-f', type=str, required=True, nargs='+', help='path to file to parse')
    parser.add_argument('--path', '-f', type=dir_path,
                        required=True, nargs='+', help='path to file to parse')
    # parser.add_argument('--database', '-d', action='store_true', required=False, help='triggers the use of a mysql database')
    return parser.parse_args()


def parse(file):
    # parse file
    docInfo, total_nouns, total_sentences = parsers.run_parsers(file)

    # calculate unique nouns, total nouns
    unqNouns = len(total_nouns)
    sumNouns = noun.calculate_num_nouns_occur(total_nouns)

    # placeholders for now
    totalTimeStr = "Total time: Uncomputed"
    costPerNounStr = "Cost per noun: Uncomputed"

    # output_writers.to_csv(docInfo, totalTimeStr,
    #   costPerNounStr, total_nouns, unqNouns, sumNouns)


def parse_all(files):
    with multiprocessing.Pool() as pool:
        pool.map(parse, files)


def main():
    print("Start of Parser program\n")
    path = parse_args(sys.argv).path[0]

    folder = os.listdir(path)
    folder = [path + '\\' + file for file in folder]

    start_time = time.time()
    parse_all(folder)
    duration = time.time() - start_time
    print(f"Total parse total, {round(duration, 2)} seconds\n")

    # args = parse_args(sys.argv[1:])

    # for file_path in args.file:
    #     if not parsers.validate_file(file_path):
    #         continue

    #     # start timer
    #     startTime = time.time()

    #     # parse file
    #     docInfo, total_nouns, total_sentences = parsers.run_parsers(file_path)

    #     # end timer
    #     elapsedTime = time.time() - startTime
    #     totalTimeStr = "Total time: " + str(round(elapsedTime, 3)) + " sec" # used in .csv file

    #     # calculate unique nouns, total nouns
    #     unqNouns = len(total_nouns)
    #     sumNouns = noun.calculate_num_nouns_occur(total_nouns)

    #     # calculate cost per noun in milliseconds
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


if __name__ == "__main__":
    main()
