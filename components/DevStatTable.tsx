import React, { useEffect, useState } from 'react';
import { Card, CardHeader } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import axios from 'axios';
import { DeveloperIssuesSummary } from '@/app/validationSchema';
import { SearchInput } from './ui/searchInput';
import { BiSearch } from 'react-icons/bi';

const DevStatTable = () => {
  const [devStatDB, setDevStatDB] = useState<DeveloperIssuesSummary[]>([]);
  const [devStat, setDevStat] = useState<DeveloperIssuesSummary[]>(devStatDB);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchDevStat = async () => {
      const resp = await axios.get('/api/developers/stat');

      if (resp.status >= 200) {
        setDevStatDB(resp.data);
      }
    };

    fetchDevStat();
  }, []);

  useEffect(() => {
    const filteredStat = devStatDB.filter((stat) => stat.name.toLowerCase().includes(input));
    setDevStat(filteredStat);
  }, [input, devStatDB]);

  return (
    <Card className="p-2 h-full">
      <div className="max-h-full h-full overflow-y-auto overflow-x-hidden">
        <CardHeader>
          <div className="w-1/2 ml-auto">
            <SearchInput
              icon={<BiSearch size={16} />}
              placeholder="Search Developer"
              onChange={(e: string) => setInput(e)}
            />
          </div>
        </CardHeader>
        <Table className="min-w-full">
          <TableHeader>
            <TableRow className="text-nowrap uppercase">
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Open</TableHead>
              <TableHead className="text-center">In Progress</TableHead>
              <TableHead className="text-center">On Review</TableHead>
              <TableHead className="text-center">On Rework</TableHead>
              <TableHead className="text-center">Closed</TableHead>
              <TableHead className="text-center">Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {devStat.map((stat) => (
              <TableRow key={stat.id}>
                <TableCell className="text-center">{stat.name}</TableCell>
                <TableCell className="text-center">{stat.OPEN}</TableCell>
                <TableCell className="text-center">{stat.IN_PROGRESS}</TableCell>
                <TableCell className="text-center">{stat.ON_REVIEW}</TableCell>
                <TableCell className="text-center">{stat.ON_REWORK}</TableCell>
                <TableCell className="text-center">{stat.CLOSED}</TableCell>
                <TableCell className="text-center">{stat.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default DevStatTable;
