"use client";

import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/searchInput";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BiSearch } from "react-icons/bi";

interface IssueProps {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  developerName?: string;
}

const Issues = () => {
  const router = useRouter();
  const [issues, setIssues] = useState<IssueProps[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<IssueProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const nbPerPage = 10;

  const numberOfPages = useMemo(() => Math.ceil(filteredIssues.length / nbPerPage), [filteredIssues]);

  const getDisplayedIssues = useCallback(() => {
    const startIndex = (currentPage - 1) * nbPerPage;
    const endIndex = startIndex + nbPerPage;
    return filteredIssues.slice(startIndex, endIndex);
  }, [filteredIssues, currentPage, nbPerPage]);

  const handleSearch = useCallback(
    (input: string) => {
      setSearchInput(input.toLowerCase());
    },
    [setSearchInput]
  );

  const fetchIssues = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/issues");
      if (response.status === 200) {
        const data = response.data.map((issue: any) => ({
          ...issue,
          developerName: issue.developerName || "Not Assigned",
        }));
        setIssues(data);
        setFilteredIssues(data);
      }
    } catch (error) {
      console.error("Error fetching issues:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getIssueDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
  };

  const formatDesc = (text: string, wordLimit: number = 10) => {
    const words = text.split(" ").slice(0, wordLimit);
    return words.length >= wordLimit ? words.join(" ") + "..." : words.join(" ");
  };

  const handleNextPage = () => {
    if (currentPage < numberOfPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  useEffect(() => {
    if (searchInput) {
      const filtered = issues.filter(
        (issue) =>
          issue.title.toLowerCase().includes(searchInput) ||
          issue.description.toLowerCase().includes(searchInput) ||
          issue.developerName?.toLowerCase().includes(searchInput)
      );
      setFilteredIssues(filtered);
      setCurrentPage(1);
    } else {
      setFilteredIssues(issues);
    }
  }, [issues, searchInput]);

  const displayedIssues = useMemo(getDisplayedIssues, [getDisplayedIssues]);

  return (
    <div className="flex flex-col items-center justify-center gap-6 pb-10">
      <div className="flex flex-wrap justify-end gap-4 self-end md:mr-7">
        <SearchInput
          icon={<BiSearch size={16} />}
          placeholder="Search the issue"
          onChange={handleSearch}
        />

        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>

      <Table>
        <TableHeader className="bg-tableHeaderBg">
          <TableRow className="text-nowrap uppercase">
            <TableHead className="text-center">Id</TableHead>
            <TableHead className="text-center">Issue</TableHead>
            <TableHead className="text-center">Description</TableHead>
            <TableHead className="text-center">Assigned To</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Created on</TableHead>
            <TableHead className="text-center">Updated on</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-tableBodyBg">
          {loading ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center h-20">
                <Spinner h={1.3} w={1.3} />
              </TableCell>
            </TableRow>
          ) : displayedIssues.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-base h-20">
                No issues found!
              </TableCell>
            </TableRow>
          ) : (
            displayedIssues.map((issue) => (
              <TableRow
                key={issue.id}
                onClick={() => router.push(`/issues/${issue.id}`)}
                className="hover:cursor-pointer hover:bg-row-hover text-center"
              >
                <TableCell className="px-2 ml-4">{issue.id}</TableCell>
                <TableCell>{issue.title}</TableCell>
                <TableCell className="w-[250px]">{formatDesc(issue.description)}</TableCell>
                <TableCell className="text-nowrap px-2">{issue.developerName}</TableCell>
                <TableCell className="text-nowrap px-2">{issue.status.replace("_", " ")}</TableCell>
                <TableCell className="text-nowrap px-2">{getIssueDate(issue.createdAt)}</TableCell>
                <TableCell className="text-nowrap px-2">{getIssueDate(issue.updatedAt)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="w-full flex flex-row items-center p-5">
        <div className="flex flex-row items-center gap-4">
          <span
            className="cursor-pointer font-semibold"
            onClick={handlePrevPage}
          >
            Prev
          </span>
          <div className="flex flex-row items-center">
            <span>{currentPage}</span>
            <span>/</span>
            <span>{numberOfPages}</span>
          </div>
          <span
            className="cursor-pointer font-semibold"
            onClick={handleNextPage}
          >
            Next
          </span>
        </div>
      </div>
    </div>
  );
};

export default Issues;
