import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';
import { TwoColumnLayout } from '../../atoms';
import '../../../core/styles/index.scss';

storiesOf('ui | atoms/TwoColumnLayout', module)
    .addDecorator(withKnobs)
    .addDecorator(centered)
    .add(
        'Two Column Layout',
        (): JSX.Element => {
            return (
                <TwoColumnLayout>
                    <span style={{ color: 'darkgray' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta sapien dolor. Vestibulum
                        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque hendrerit
                        lorem risus, id sagittis eros viverra nec. Maecenas commodo ac quam eget cursus. Donec ac
                        euismod ipsum. Mauris eget nibh a nibh sagittis semper. Mauris facilisis maximus venenatis. Nunc
                        blandit malesuada dui, vel varius leo vestibulum eu. Sed volutpat suscipit efficitur. Cras
                        pharetra eros id purus efficitur, ac ullamcorper lorem aliquam. Quisque metus felis, porta et
                        malesuada quis, pretium quis risus. Donec feugiat quis odio at pellentesque. Vestibulum luctus
                        ac eros sed volutpat. Proin sed congue risus. Etiam bibendum augue vitae turpis consequat
                        sollicitudin. Cras tempus sit amet eros ac malesuada. Duis at vulputate neque. Aenean non
                        scelerisque ligula, nec condimentum nunc. Aliquam quis commodo magna. Orci varius natoque
                        penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas eleifend bibendum
                        velit at placerat. Vestibulum sodales turpis eu mauris mollis fermentum. Cras nec mattis ligula.
                        Vivamus nec libero nibh. In sed odio nisi. Mauris eget posuere massa, nec facilisis nulla. Cras
                        et bibendum nisl. Nam rhoncus libero eget bibendum varius. Aliquam vitae ligula id urna auctor
                        molestie. Pellentesque rhoncus velit tortor, non vestibulum urna aliquam sed. Etiam in eros
                        finibus, fermentum sapien non, pharetra ex. Sed feugiat pharetra pharetra. Sed posuere felis at
                        nibh semper venenatis. Pellentesque volutpat ipsum non purus mollis auctor. Ut vehicula sagittis
                        volutpat. Nullam egestas elit pharetra, varius elit aliquam, posuere elit. Cras condimentum ex
                        vel justo faucibus, quis tincidunt nulla venenatis. Praesent maximus sem vitae purus tristique
                        pellentesque. Donec varius enim id nunc ullamcorper luctus. Pellentesque venenatis mi dolor, id
                        ultrices ipsum eleifend sed. Duis euismod dui sit amet sapien congue, vitae venenatis felis
                        finibus. Cras luctus lobortis lorem vel aliquet. Phasellus facilisis molestie dui, imperdiet
                        sodales nibh vulputate at. Cras ut sapien elit. Pellentesque finibus lacus in dignissim blandit.
                        Donec eleifend dictum erat, a semper arcu imperdiet at. Mauris aliquam pharetra tristique. Sed
                        consectetur ligula id felis condimentum tristique. Curabitur consequat quam purus, quis
                        facilisis ipsum elementum et. Duis efficitur, velit a porta hendrerit, nulla urna congue est, a
                        tristique sapien sem eu nunc. Aliquam sodales aliquet odio et suscipit. Nulla eget ipsum nisi.
                    </span>
                    <span style={{ color: 'darkblue' }}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta sapien dolor. Vestibulum
                        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Quisque hendrerit
                        lorem risus, id sagittis eros viverra nec. Maecenas commodo ac quam eget cursus. Donec ac
                        euismod ipsum. Mauris eget nibh a nibh sagittis semper. Mauris facilisis maximus venenatis. Nunc
                        blandit malesuada dui, vel varius leo vestibulum eu. Sed volutpat suscipit efficitur. Cras
                        pharetra eros id purus efficitur, ac ullamcorper lorem aliquam. Quisque metus felis, porta et
                        malesuada quis, pretium quis risus. Donec feugiat quis odio at pellentesque. Vestibulum luctus
                        ac eros sed volutpat. Proin sed congue risus. Etiam bibendum augue vitae turpis consequat
                        sollicitudin. Cras tempus sit amet eros ac malesuada. Duis at vulputate neque. Aenean non
                        scelerisque ligula, nec condimentum nunc. Aliquam quis commodo magna. Orci varius natoque
                        penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas eleifend bibendum
                        velit at placerat. Vestibulum sodales turpis eu mauris mollis fermentum. Cras nec mattis ligula.
                        Vivamus nec libero nibh. In sed odio nisi. Mauris eget posuere massa, nec facilisis nulla. Cras
                        et bibendum nisl. Nam rhoncus libero eget bibendum varius. Aliquam vitae ligula id urna auctor
                        molestie. Pellentesque rhoncus velit tortor, non vestibulum urna aliquam sed. Etiam in eros
                        finibus, fermentum sapien non, pharetra ex. Sed feugiat pharetra pharetra. Sed posuere felis at
                        nibh semper venenatis. Pellentesque volutpat ipsum non purus mollis auctor. Ut vehicula sagittis
                        volutpat. Nullam egestas elit pharetra, varius elit aliquam, posuere elit. Cras condimentum ex
                        vel justo faucibus, quis tincidunt nulla venenatis. Praesent maximus sem vitae purus tristique
                        pellentesque. Donec varius enim id nunc ullamcorper luctus. Pellentesque venenatis mi dolor, id
                        ultrices ipsum eleifend sed. Duis euismod dui sit amet sapien congue, vitae venenatis felis
                        finibus. Cras luctus lobortis lorem vel aliquet. Phasellus facilisis molestie dui, imperdiet
                        sodales nibh vulputate at. Cras ut sapien elit. Pellentesque finibus lacus in dignissim blandit.
                        Donec eleifend dictum erat, a semper arcu imperdiet at. Mauris aliquam pharetra tristique. Sed
                        consectetur ligula id felis condimentum tristique. Curabitur consequat quam purus, quis
                        facilisis ipsum elementum et. Duis efficitur, velit a porta hendrerit, nulla urna congue est, a
                        tristique sapien sem eu nunc. Aliquam sodales aliquet odio et suscipit. Nulla eget ipsum nisi.
                    </span>
                </TwoColumnLayout>
            );
        },
    );
