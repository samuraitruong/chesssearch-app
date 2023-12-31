import { useEffect, useState } from 'react';
import { AiFillFileAdd } from 'react-icons/ai';
import { Modal } from './Modal';
import { parsePGN } from '../Shared/Pgn';
import { BiCloudUpload } from 'react-icons/bi';
import { MdOutlineReviews } from 'react-icons/md';
interface OpenPgnProps {
  onGameLoad: (game: any) => void;
}

export function OpenPgn({ onGameLoad }: OpenPgnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [game, setGame] = useState<any>();
  const [fileContent, setFileContent] = useState<string>();

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target?.result) {
          const content = e.target.result.toString();
          setFileContent(content);
        }
      };

      reader.readAsText(file);
    }
  };
  useEffect(() => {
    if (fileContent) {
      setGame(parsePGN(fileContent));
    }
  }, [fileContent]);
  const onClose = () => {
    setIsOpen(false);
  };
  const openGame = () => {
    setIsOpen(false);
    if (game) {
      onGameLoad(game);
    }
  };
  return (
    <div>
      <AiFillFileAdd onClick={() => setIsOpen(true)} />
      {isOpen && (
        <Modal onClose={onClose}>
          <div className="container mx-auto mt-8 min-w-[400px]">
            <div className="flex justify-between">
              <label className="relative cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <span>
                  {' '}
                  <BiCloudUpload className="inline mr-2" /> Select a PGN file
                </span>
                <input
                  type="file"
                  accept=".pgn, .txt"
                  onChange={handleFileChange}
                  className="hidden absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </label>

              {fileContent && (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={openGame}
                >
                  <MdOutlineReviews className="inline mr-2" /> View this game
                </button>
              )}
            </div>

            <div className="mt-4">
              {fileContent && (
                <div>
                  <h2 className="text-xl font-bold mb-2">Game content:</h2>
                  <pre className="bg-gray-100 mt-2 p-2 border rounded max-h-[75vh] overflow-y-auto text-sm">
                    {fileContent}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
