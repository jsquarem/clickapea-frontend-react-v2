import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Planner } from '../../components/Planner/Planner';
import Container from 'react-bootstrap/Container';

export default function PlannerPage() {
  return (
    <Container className="pb-5">
      <DndProvider backend={HTML5Backend}>
        <Planner />
      </DndProvider>
    </Container>
  );
}
