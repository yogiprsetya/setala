import React from 'react';
import { Input } from '~/components/ui/input';
import { TitlePage } from '../_components/TitlePage';
import { AddResourceDialog } from './_add-resource-dialog';

const ResourcePage = () => {
  return (
    <>
      <TitlePage
        title="Resources"
        description="Useful materials, references, and information you collect and use to complete your projects and manage your areas."
      />

      <div className="flex w-full max-w-sm items-center space-x-2 mb-4">
        <Input type="text" placeholder="search" />
        <AddResourceDialog />
      </div>
    </>
  );
};

export default ResourcePage;
